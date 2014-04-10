var Book = Backbone.Model.extend({
  defaults: {
    author: 'ناشناس',
    date: 'نا مشخص',
    available: true
  }
});

var BooksList = Backbone.Collection.extend({
  model: Book,
  url: '/list',
  comparator: function(a, b) {
    return b.get('id') - a.get('id');
  }
});

var list = new BooksList;
list.fetch();

var BooksView = Backbone.View.extend({
  model: list,
  el: $('#container'),
  template: Handlebars.compile( $('#template').html() ),
  events: {
    'click .remove': 'remove',
    'click .add': 'add'
  },
  initialize: function() {
    this.listenTo(this.model, 'all', this.render);
    this.render();
  },
  render: function() {
    if( this.model instanceof Backbone.Collection )
      this.$el.html( this.template( this.model.toJSON() ) );
    else 
      this.$el.html( this.template( [this.model.toJSON()] ) );
    return this;
  },
  remove: function(e) {
    var book = $(e.currentTarget).parent();
    var id = +book.attr('data-id');
    this.model.get(id).destroy();
  },
  add: function(e) {
    $('#addForm').removeClass('hidden');
    $('#addForm').submit(function() {
      var data = {};
      $(this).children('input').each(function() {
        var key = $(this).attr('id');
        var value = $(this).attr('type') == 'checkbox' ? $(this).prop('checked') : $(this).val();
        data[key] = value;
      })
      list.create(new Book(data));
      return false;
    })
  }
});

var Router = Backbone.Router.extend({
  routes: {
    'b/:id': 'showBook',
    '*other': 'defaultRoute'
  },
  showBook: function(id) {
    view.model = list.get(+id);
    view.render();
  },
  defaultRoute: function() {
    view.model = list;
    view.render();
  }
})

var view = new BooksView;

var router = new Router;
Backbone.history.start();
