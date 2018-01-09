(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';

        searchedForText = searchField.text;
		const unsplashRequest = new XMLHttpRequest();
		searchedForText = searchField.value;
		unsplashRequest.open('GET', 'https://api.unsplash.com/search/photos?page=1&query=' + searchedForText);
		unsplashRequest.onload = addImage;
		unsplashRequest.setRequestHeader('Authorization', 'Client-ID c8bf7cffc79c7a428f85ba3ac493350c9d1553a5d41526abbfefe053182c1f3a');
		unsplashRequest.send();

		const nyTimesRequest = new XMLHttpRequest();
		nyTimesRequest.open('GET','http://api.nytimes.com/svc/search/v2/articlesearch.json?q='+searchedForText+'&api-key=026c3074f39347ad90a0377819ffee33');
		nyTimesRequest.onload = addArticles;
		nyTimesRequest.send();
    });

    function addImage(){
		let htmlContent = '';
		var firstImage = '';
		var data = JSON.parse(this.responseText);
		for(var i=0; i<data.results.length; i++){
			firstImage = data.results[i];
			htmlContent += '<figure><img src="' + firstImage.urls.regular +'" alt="' + searchedForText + '"><figcaption>' + searchedForText + ' by ' + firstImage.user.name + '</figcaption></figure>';
		}
		responseContainer.insertAdjacentHTML('afterBegin',htmlContent);
	}

	function addArticles(){
		let htmlContent='';
		var article = '';
		var dataArticle = JSON.parse(this.responseText);
		for(var i=0; i<dataArticle.response.docs.length; i++){
			article = dataArticle.response.docs[i];
			htmlContent += '<div><a href="' + article.web_url +"'>" +  article.web_url + "</a><p>" + article.snippet + "</p></div>";
		}
		responseContainer.insertAdjacentHTML('afterBegin',htmlContent);
	}

})();




