from flask import Flask, request, jsonify
from pymongo import MongoClient

import pandas as pd
from ast import literal_eval
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import bson



app= Flask(__name__)
client = MongoClient('mongodb://localhost:27017/',unicode_decode_error_handler='ignore') 
db = client['MovieDB'] 
collection = db['movies'] 


def get_movies():
    l=[]
    c=0
    cursor=collection.find()
    for data in cursor:
        l.append(data)
    return l

def initialise():
    movies=get_movies()
    df=pd.DataFrame.from_dict(movies)
    fl={'overview':"","tagline":""}
    df.fillna(value=fl,inplace=True)
    df['desc']=df['tagline']+df['overview']+df['title']
    cv=CountVectorizer(max_features=5000,stop_words='english')
    vec=cv.fit_transform(df['desc'])
    cos_sim=cosine_similarity(vec)
    df = df.reset_index()
    indices = pd.Series(df.index, index=df['_id'])
    return (df,indices,cos_sim)




@app.route('/<movieId>',methods=['GET'])
def similarMovies(movieId):
    res=[]
    try:
        movieId=int(movieId)
        df,indices,cos_sim=initialise()
        idx = indices[movieId]
        sim_scores = list(enumerate(cos_sim[idx]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        sim_scores = sim_scores[1:min(11,len(sim_scores))]
        movie_indices = [i[0] for i in sim_scores]
        res= df.iloc[movie_indices]._id.tolist()
    except:
        pass 
    return jsonify(res)

if __name__ == '__main__':
      app.run(host='0.0.0.0', port=5001)
    




