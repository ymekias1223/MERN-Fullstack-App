const	mongoose 	= require('mongoose'), 
			Promise		= require('bluebird'), 
			express 	= require('express'),
			util			= require('util'),   
			app 			= express();

mongoose.Promise	= Promise;

// Create a Schema class with mongoose
var Schema = mongoose.Schema;

var ArticleSchema = new Schema ({
	headline: {
		type: String,
		trim: true
	},
	snippet: {
		type: String,
		trim: true
	},
	byline: {
		type: String,
		trim: true
	}, 
	pub_date: {
		type: Date,
		trim: true
	},
	date_saved: {
		type: Date,
		default: Date.now
	}, 
	web_url: {
		type: String,
		trim: true,
		unique: true,
		required: "url is required"
	}
});

ArticleSchema.methods.deleteArticle = function(req, res) {
	return this.model('Article')
	.findByIdAndRemove({_id: req.query._id})
	.exec(function(err, deleted) {
		if(err) {
			console.log(err);
		}
	});
};

ArticleSchema.methods.saveArticle = function(req, res, article) {
	return this
		.save({article: req.query})
		.then(function(data) {
			console.log(data);
		}).catch(function(e) {
			console.error('error');
		});
};

ArticleSchema.methods.getArticles = function(req, res) {
	return this.model('Article')
	.find({})
	.then(function(data) {
		console.log('find getArticles ' + util.inspect(data));
		res.json(data);
	});
};



var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;