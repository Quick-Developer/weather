class EventsHandler {
    constructor(weathersRepository, weathersRenderer, utilityFunction) {
        this.weathersRepository = weathersRepository;
        this.weathersRenderer = weathersRenderer;
        this.citis = ["London", "Paris", "New York"]
        this.utility = utilityFunction;
        this.$list = $(".forecast-list");
    }

    registerAddWeather() {
        $('#search').on('click', () => {
            let $input = $("#city");
            if ($input.val() === "") {
                alert("Please enter city!");
            } else {
                let self = this;
                let citi = $input.val()
                for (let i = 0; i < this.citis.length; i++) {
                    $.get("http://api.openweathermap.org/data/2.5/forecast?q=" + this.citis[i] + "&appid=d703871f861842b79c60988ccf3b17ec",
                        function (data) { }
                    ).done(function (data) {
                        let newData = self.utility.createObj(data);                        
                        self.weathersRepository.addForecast(newData);
                        self.weathersRenderer.renderForecasts(self.weathersRepository.weatherForecasts);
                        let newArr = self.utility.createRowsObj(data);
                        self.weathersRenderer.renderTable(newArr);
                    }).fail(function () {
                        console.log("error get reqest");
                    });
                }
                $input.val("");
            }
        });
    }

    registerRemoveWeather() {
        this.$list.on('click', '.remove-forecast', (event) => {
            let index = $(event.currentTarget).closest('.forecast').index();;
            this.weathersRepository.removeForecast(index);
            this.weathersRenderer.renderForecasts(this.weathersRepository.weatherForecasts);
        });

    }

    registerToggleComments() {
        this.$list.on('click', '.toggle-comments', (event) => {
            let $clickedForecast = $(event.currentTarget).closest('.forecast');
            $clickedForecast.find('.comments-container').toggleClass('show');
        });
    }

    registerAddComment() {
        this.$list.on('click', '.add-comment', (event) => {
            let $comment = $(event.currentTarget).siblings('.comment-input');
            if ($comment.val() === "") {
                alert("Please enter a comment!");
                return;
            }

            let forecastIndex = $(event.currentTarget).closest('.forecast').index();
            let newComment = { text: $comment.val() };

            this.weathersRepository.addComment(newComment, forecastIndex);
            this.weathersRenderer.renderComments(this.weathersRepository.weatherForecasts, forecastIndex);
            $comment.val("");
        });

    }

    registerRemoveComment() {
        this.$list.on('click', '.remove-comment', (event) => {
            let $commentsList = $(event.currentTarget).closest('.forecast').find('.comments-list');
            let forecastIndex = $(event.currentTarget).closest('.forecast').index();
            let commentIndex = $(event.currentTarget).closest('.comment').index();
            this.weathersRepository.deleteComment(forecastIndex, commentIndex);
            this.weathersRenderer.renderComments(this.weathersRepository.weatherForecasts, forecastIndex);
        });
    }
}

export default EventsHandler