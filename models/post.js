var mongodb=require('./db');


function Post(name,title,post)
{
    this.name=name;
    this.title=title;
    this.post=post;

}

module.exports=Post;

Post.prototype.save=function(callback)
{
var tam=new Date();


    var post={
      name:this.name,
      tam:tam,
      title:this.title,
      post:this.post
  }

    mongodb.open(function (err, db) {
        if(err){
            return callback(err);
        }
        db.collection('test',function(err,collection){
            if(err){
                mongodb.close();
                return collection(err);
            }
            collection.insert(post,{safe:true},
            function(err){
                mongodb.close;
                if(err){
                    return  callback(err);
                }
               callback(null);
            });
        });
    });

};

Post.get=function(name,callback)
{
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection('test',function(err,collection){
            if(err){
                mongodb.close();
                return collection(err);
            }
         var query={};
            if(name){
                query.name=name;

            }
            collection.find(query).sort({
                time:-1
            }).toArray(function(err,docs){
                mongodb.close();
                if(err){
                    return collection(err);
                }
                callback(null,docs);
            });
        });
    });
};