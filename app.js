var express=require("express"),
     app=express(),
     	bodyparser  =require("body-parser"),
    mongoose=require("mongoose");

mongoose.connect("mongodb://localhost/mydb");

var CommentSchema=mongoose.Schema({
   name:String,
   body:String,
   upvote: Number,
   downvote: Number
   });


var comments=mongoose.model("Comments",CommentSchema);

app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine","ejs");



app.get("/",function(req,res)
{
	comments.find({}, function(err,allComments)
	{
	if(err)
	{
		console.log(err);
	}
	else
	{
		res.render("posts",{comnt:allComments});
	}
	});
});


app.post("/",function(req,res)
{
    var n= req.body.auth;
    var bdy= req.body.txtcom;
    var newComment= {name:n,body:bdy,upvote:0,downvote:0};
    
    console.log(newComment);
	comments.create(newComment,function(err,camp)
		{
			if(err)
			{
				console.log(err);
			}
			else
			res.redirect("/");
		});
});
app.post("/upvoted",function(req,res){
	var id=req.body.id;
	var old=Number(req.body.val);
comments.findByIdAndUpdate(id, {upvote : old+1 },function(err,upv)

{
	if(err)
	{
		console.log(err);
	}
	
});
	res.redirect("/");
});

app.post("/downvoted",function(req, res) {
    	var id=req.body.id;
    	var old=Number(req.body.val);
	comments.findByIdAndUpdate(id, {downvote : old+1 },function(err,dnv)
{
	if(err)
	{
		console.log(err);
	}
	
});
	res.redirect("/");
});
 





app.listen(process.env.PORT,process.env.IP,function(req,res)
{
	console.log("Server Started");
});