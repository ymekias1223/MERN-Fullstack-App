const React = require('react');
const Masonry = require('react-masonry-component');

let Results = React.createClass({
	getInitialState: function() {
		return {
			postArticle: {}
		};
	}, 
	_showNyt: function(articles) {
		let mapArts = articles.map((itemObj, index) => {
			return( 
       <div className="col col-sm-3 col-result-body grid-item" key={index}>
        	<h4><a href={itemObj.web_url} target="_blank">{itemObj.headline}</a></h4>
          <p>{itemObj.pub_date}</p>
          <p>{itemObj.byline}</p>
          <p>... {itemObj.snippet}...</p>
          <button 
          	type="button" 
          	className="btn btn-large btn-save btn-this" 
          	onClick={() => {
          		this.props._mongoPost(itemObj)
          	}}>Save Article</button><br />
        </div>
      );
    });
    return mapArts;
 	},
 	_showResults: function(toggle) {
 		if(toggle == false) {
 			return (
 				<div></div>
 			);
 		} else if (toggle == true) {
 			return (
				<div className="container">
					<div className="row row-result-title grid">
						<div className="col col-sm-12 col-result-title">
							<h2 className="text-right"><i className="fa fa-search-plus"></i>   Your search returned {this.props.articlesNyt.length} articles</h2>
						</div>{/* end col-sm-12 */}
					</div>{/* end row */}
					<Masonry
						className={'row'} // default '' 
						elementType={'div'} // default 'div'  
						disableImagesLoaded={false} // default false 
						updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false 
					>
						{this._showNyt(this.props.articlesNyt)}
					</Masonry>
				{/* end container */}
				</div>
			);
 		}
 	},
	render: function() {
		return (
			<div>
				{this._showResults(this.props.toggle)}
			</div>
		);
	}

});





module.exports = Results;