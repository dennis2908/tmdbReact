class MyTitle extends React.Component {

    constructor(props){
        //Since we are extending the default constructor,
        //handle default activities first.
        super(props);
      
        //Extract the firstname from the prop
        let title = this.props.title
        //Please don't judge me by the way I extract the first name.
        //This is an example.
        
        //In the constructor, feel free to modify the
        //state property on the current context.
        this.state = {
            title: title
        }

    } //Look maa, no comma required in JSX based class defs!

    render() {
        return <h2><span className="badge bg-secondary">{this.state.title}</span></h2>
    }
}

class MyMain extends React.Component {
  
  constructor(props) {
    super(props);
	this.inputAngka = "";  
	this.query="raya";
	this.total_pagesSearch = 1;
	this.inputCek = "";
	this.items = [];
	this.bin = "";
	this.state = {rows1:[],inputAngka: '', result: "",items : [],rows:[],page:1,rowsSearch:[],total_pagesSearch:1, perPageSearch:"",FormSearchstyle:{
		display:"block"
	},FormCategorystyle:{
		display:"none"
	},FormDetail:{
		display:"none"
	},
	detail:{
		title:'',
		vote_count:'',
		release_date:'',
		poster_path:''
	}
	};
 	this.myCategory = this.myCategory.bind(this);
	this.getSearch = this.getSearch.bind(this);
	this.nextPage = this.nextPage.bind(this);
	this.beforePage = this.beforePage.bind(this);
	this.showMenuSearch = this.showMenuSearch.bind(this);
	this.showMenuCategory = this.showMenuCategory.bind(this);
 }
 componentDidMount() {
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=b703e8213e3a53d5123f64ef56c52d8c&language=en-US")
      .then(res => res.json())
      .then(
        (result) => {
		  this.setState({
             rows: result.results,
		  });
		  let rowsx = [];
		  rowsx[0] = result.results[0];
		  this.setState({
            rows1 : rowsx
		  });
		});
	fetch("https://api.themoviedb.org/3/search/movie?api_key=b703e8213e3a53d5123f64ef56c52d8c&language=en-US&query="+this.query)
      .then(res => res.json())
      .then(
        (result) => {
		  this.setState({
             rowsSearch: result.results,
			 total_pagesSearch:result.total_pages
		  });
		});	
  }
 
  
  myCategory(event) {
	let category = event.target.category.value;
	this.perPage = 	event.target.perPage.value;
	if(category == 1){
		this.getAPICategory("https://api.themoviedb.org/3/movie/popular	?api_key=b703e8213e3a53d5123f64ef56c52d8c&language=en-US");
	}
	else if(category == 2){
		this.getAPICategory("https://api.themoviedb.org/3/movie/top_rated?api_key=b703e8213e3a53d5123f64ef56c52d8c&language=en-US");
	}
	else{
		this.getAPICategory("https://api.themoviedb.org/3/movie/now_playing?api_key=b703e8213e3a53d5123f64ef56c52d8c&language=en-US");
	}
	event.preventDefault();
  }
  
  getAPICategory(url) {
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
		  this.setState({
             rows: result.results
		  });
		})
  }

  myChange(event) {
	var keynum
    if(window.event) {// IE8 and earlier
       keynum = event.keyCode;
    } else if(event.which) { // IE9/Firefox/Chrome/Opera/Safari
       keynum = event.which;
    } else {
       keynum = 0;
    }

    if(keynum === 8 || keynum === 0 || keynum === 9) {
        return;
    }
    if(keynum < 46 || keynum > 57 || keynum === 47) {
        event.preventDefault();
    } 
  } 
  
 
  getDetail(data) {
	   let poster_path =  "https://image.tmdb.org/t/p/w500/" + data.poster_path;
	   let vote_count = 0;
	   this.setState({
		  detail:{
			  title:data.title,
			  vote_count:data.vote_count,
			  release_date:data.release_date,
			  poster_path:poster_path,
			  
		  }
	   });
	   $('#DMmodal').modal('toggle');
	   
  }
  goToPage(thePage,e) {
	  console.log("https://api.themoviedb.org/3/search/movie?api_key=b703e8213e3a53d5123f64ef56c52d8c&language=en-US&query="+encodeURIComponent(this.query)+"&page="+thePage)
	fetch("https://api.themoviedb.org/3/search/movie?api_key=b703e8213e3a53d5123f64ef56c52d8c&language=en-US&query="+encodeURIComponent(this.query)+"&page="+thePage)
      .then(res => res.json())
      .then(
        (result) => {
	   this.setState({
            rowsSearch: result.results,
			total_pagesSearch:result.total_pages,
			page:thePage,
			FormSearchstyle:{
		display:"block"
	},FormCategorystyle:{
		display:"none"
	},FormDetail:{
		display:"none"
	}
	   });
		});	
		event.preventDefault();
  }
  getSearch(event) {
	this.query = event.target.inputSearch.value;
	console.log("https://api.themoviedb.org/3/search/movie?api_key=b703e8213e3a53d5123f64ef56c52d8c&language=en-US&query="+encodeURIComponent(this.query)+"&page=1");
	fetch("https://api.themoviedb.org/3/search/movie?api_key=b703e8213e3a53d5123f64ef56c52d8c&language=en-US&query="+encodeURIComponent(this.query)+"&page=1")
      .then(res => res.json())
      .then(
        (result) => {
	   this.setState({
		    page : 1,
            rowsSearch: result.results,
			total_pagesSearch:result.total_pages,
			FormSearchstyle:{
		display:"block"
	},FormCategorystyle:{
		display:"none"
	},FormDetail:{
		display:"none"
	}
	   });
		});	
	   event.preventDefault();
  }
  nextPage(event) {
	let mypage = this.state.page+1;
	console.log("https://api.themoviedb.org/3/search/movie?api_key=b703e8213e3a53d5123f64ef56c52d8c&language=en-US&query="+encodeURIComponent(this.query)+"&page="+mypage);
	fetch("https://api.themoviedb.org/3/search/movie?api_key=b703e8213e3a53d5123f64ef56c52d8c&language=en-US&query="+encodeURIComponent(this.query)+"&page="+mypage)
      .then(res => res.json())
      .then(
        (result) => {
	   this.setState({
		    page:mypage,
            rowsSearch: result.results,
			FormSearchstyle:{
		display:"block"
	},FormCategorystyle:{
		display:"none"
	},FormDetail:{
		display:"none"
	}
	   });
		});	
	   event.preventDefault();
  }
  beforePage(event) {
	let mypage = this.state.page-1;
	fetch("https://api.themoviedb.org/3/search/movie?api_key=b703e8213e3a53d5123f64ef56c52d8c&language=en-US&query="+encodeURIComponent(this.query)+"&page="+mypage)
      .then(res => res.json())
      .then(
        (result) => {
	   this.setState({
		     page:mypage,
            rowsSearch: result.results,
			FormSearchstyle:{
		display:"block"
	},FormCategorystyle:{
		display:"none"
	},FormDetail:{
		display:"none"
	}
	   });
		});	
	   event.preventDefault();
  }
  showIndex() {
	   this.setState({
			FormSearchstyle:{
		display:"block"
	},FormCategorystyle:{
		display:"block"
	},FormDetail:{
		display:"none"
	}
	   });
  }
  showMenuSearch() {
	   this.setState({
			FormSearchstyle:{
		display:"block"
	},FormCategorystyle:{
		display:"none"
	},FormDetail:{
		display:"none"
	}
	   });
  }
  showMenuCategory() {
	   this.setState({
			FormSearchstyle:{
		display:"none"
	},FormCategorystyle:{
		display:"block"
	},FormDetail:{
		display:"none"
	}
	   });
  }

	render() {
	let listPagination = [];
	if(this.state.page > 1)
		listPagination.push(<li key="beforePage" className="page-item"><a className="page-link" href="#" onClick={this.beforePage}>Previous</a></li>);
    for (var i = 1; i <= this.state.total_pagesSearch; i++) {
		listPagination.push(<li key={String(i)} className="page-item"><a className="page-link" href="#"onClick={this.goToPage.bind(this, i)}>{i}</a></li>);
    }
	if(this.state.total_pagesSearch!=this.state.page)
		listPagination.push(<li key="nextPage" className="page-item"><a className="page-link" href="#" onClick={this.nextPage}>Next</a></li>);
	
    return (
	<div>
	<nav className="navbar navbar-expand-lg navbar-light bg-primary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#"><svg width="15" height="15" fill="currentColor" className="bi bi-layout-text-sidebar" viewBox="0 0 16 16">
  <path d="M3.5 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM3 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z"/>
  <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm12-1v14h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zm-1 0H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h9V1z"/>
</svg> Menu</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#" onClick={this.showMenuSearch} ><svg width="15" height="15" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg> Search</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#" onClick={this.showMenuCategory} ><svg width="15" height="15" fill="currentColor" className="bi bi-grid-fill" viewBox="0 0 16 16">
  <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"/>
</svg> Category</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
	<div className="form-row" style={this.state.FormDetail}>
	 <h3><span className="badge bg-info mt-4 text-start">Detail Movie</span></h3> 
	  {
		  this.state.rows1.map((k, v) => {     
           let poster_path =  "https://image.tmdb.org/t/p/w500/" + k.poster_path;          
           // Return the element. Also pass key     
           return (
		    <div className="form-group col-md-3" key={String(k) + String(v)}>
			  <img className="form-control col-xl-3" src={poster_path} htmlFor="form-control" alt="Girl in a jacket" width="130" height="130"/> 
			  <label className="form-control col-md-12" htmlFor="inputEmail4">Vote Count : {k.vote_count}</label>
			   <label className="form-control col-md-12" htmlFor="inputEmail4">Release Date : {k.release_date}</label>
			</div>
		   ) 
        })
	  
	  }
  </div>
  <div style={this.state.FormSearchstyle}>
     <form className="mt-3" onSubmit={this.getSearch}>
	 <h2><span className="badge bg-secondary"><svg width="20" height="20" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg> Search Movie TMDB</span></h2>
  <div className="mb-3">
    <label htmlFor="inputSearch" className="form-label">Keyword</label>
    <input type="text" className="form-control" id="inputSearch" name = "inputSearch" required/>
  </div>
  <button type="submit" className="btn btn-primary mb-2 ">Search <svg width="16" height="16" fill="currentColor" className="bi bi-save2" viewBox="0 0 16 16">
  <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v4.5h2a.5.5 0 0 1 .354.854l-2.5 2.5a.5.5 0 0 1-.708 0l-2.5-2.5A.5.5 0 0 1 5.5 6.5h2V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/>
</svg></button>
</form>
<div className="row">
          <div className="col">
            <table className="table table-dark">
			   <thead>
				<tr>
				  <th scope="col">#</th>
				  <th scope="col">Title</th>
				  <th scope="col">Vote Count</th>
				  <th scope="col">Image</th>
				  <th scope="col">Release Date</th>
				</tr>
			  </thead>
               <tbody>
			    {
				   
				   this.state.rowsSearch.map((k, v) => {	
                   let perPageSearch = parseInt(this.state.perPageSearch);
				   console.log(this.state.page);
                   if(!perPageSearch)
                       perPageSearch = 20;					   
				   var page = v+1;
        		   if(this.state.page > 1){
					   page=(perPageSearch*(this.state.page-1))+v+1;
				   }   					
				   let poster_path =  "https://image.tmdb.org/t/p/w500/" + k.poster_path;          
				   // Return the element. Also pass key   
				   				
				   if(perPageSearch != 20) {
					   if((v+1) > perPageSearch)
					   {
						  return;
					   }
						    
				   }		
				   return (
				   <tr key={String(k) + String(v)}><th scope="col">{page}</th>
				   <th scope="col">{k.title}</th>
				   <th scope="col">{k.vote_count}</th>
				   <th scope="col"> <img className="btn" src={poster_path} onClick={() => this.getDetail(k)} alt={k.title} width="130" height="130"/> </th>
				   <th scope="col">{k.release_date}</th>
				   </tr>) 
				})}
               </tbody>
              </table>
          </div>
		<nav aria-label="Page navigation example">
  <ul className="pagination">
      {listPagination}
    
  </ul>
</nav>

		 
</div>
</div>

<div className="modal fade" id="DMmodal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-lg">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">{this.state.detail.title || ""}</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
       <div className="row g-3" >
	 <div className="col-md-5 ms-5">
	<img src={this.state.detail.poster_path} alt={this.state.detail.title} width="300" height="300"/>
  </div>
  <div className="col-md-5 ms-5">
    <label className="form-label">Title</label>
	<label className="form-control mb-4">{this.state.detail.title}</label>
	<label className="form-label">Vote Count</label>
	<label className="form-control mb-4">{this.state.detail.vote_count}</label>
	<label className="form-label">Release Date</label>
	<label className="form-control">{this.state.detail.release_date}</label>
  </div>	
</div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<div style={this.state.FormCategorystyle}>
<form onSubmit={this.myCategory} className="mt-3">
<h2><span className="badge bg-secondary"><svg width="20" height="20" fill="currentColor" className="bi bi-grid-fill" viewBox="0 0 16 16">
  <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"/>
</svg> Category Movie TMDB</span></h2>
   <div className="mb-3">
    <label htmlFor="category" className="form-label">Category</label>
    <select name="category" id="category" className="form-control">
  <option value="1">Popular Movie</option>
  <option value="2">Top Rated Movie</option>
  <option value="3">Now Playing Movie</option>
</select>
  </div>
  <div className="mb-3">
    <label htmlFor="perPage" className="form-label">Per Page</label>
    <select name="perPage" id="perPage" className="form-control">
  <option value="0">20</option>
  <option value="15">15</option>
</select>
  </div>
  <button type="submit" className="btn btn-primary">Submit <svg width="16" height="16" fill="currentColor" className="bi bi-play-btn" viewBox="0 0 16 16">
  <path d="M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
</svg></button>
   <h3><span className="badge bg-info mt-4 text-start" dangerouslySetInnerHTML={{__html: this.state.result}}></span></h3> 
</form>
<div className="row">
          <div className="col">
            <table className="table table-dark">
			   <thead>
				<tr>
				  <th scope="col">#</th>
				  <th scope="col">Title</th>
				  <th scope="col">Vote Count</th>
				  <th scope="col">Image</th>
				  <th scope="col">Release Date</th>
				</tr>
			  </thead>
               <tbody>
			    {this.state.rows.map((k, v) => {
				let perPage = parseInt(this.perPage);					
				   if(perPage) {
					   if((v+1) > perPage)
					   {
						  return;
					   }
						    
				   }
				   let poster_path =  "https://image.tmdb.org/t/p/w500/" + k.poster_path;          
				   // Return the element. Also pass key     
				   return (
				   <tr key={String(k) + String(v)}><th scope="col">{v+1}</th>
				   <th scope="col">{k.title}</th>
				   <th scope="col">{k.vote_count}</th>
				   <th scope="col"> <img className="btn" src={poster_path} onClick={() => this.getDetail(k)} alt="Girl in a jacket" width="130" height="130"/> </th>
				   <th scope="col">{k.release_date}</th>
				   </tr>) 
				})}
               </tbody>
              </table>
          </div>
</div>

</div>
</div>
    );
  }
}

var theTitle = "TMDB";

ReactDOM.render(<MyMain/>, 
                document.getElementById('mymain'));		
document.title=theTitle;									