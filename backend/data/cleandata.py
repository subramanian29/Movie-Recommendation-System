import json
import os
path=os.path.dirname(os.path.abspath(__file__))
f=open(path+'/data.json','r')


data= json.load(f)
for i in data:
    if(i['id']==11011):
        print(i['title'])
    for k in i:
        try:
            i[k]=i[k].encode('ascii','ignore').decode('ascii')
        except:
            pass

f.close()
f=open(path+'/data_cleaned.json','w')
json.dump(data,f)
f.close()
