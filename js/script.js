"use strict";
$(function(){

	window.addEvent('domready',function(){

		/* Поиск */
		var searchBox = $('search-box'), searchLoaded=false, searchFn = function() {

			if(!searchLoaded) {
				searchLoaded = true; // Загружать повторно ничего не надо!

				//
				var container = new Element('div',{ id: 'search-results' }).inject($('search-area'),'after');
				var wrapper = new Element('div',{
					styles: {
						position: 'relative'
					}
				}).inject(container);
				new Element('div',{ id: 'search-results-pointer' }).inject(wrapper);
				var contentContainer = new Element('div',{ id: 'search-results-content' }).inject(wrapper);
				var closer = new Element('a', {
					href: 'javascript:;',
					text: 'Закрыть',
					styles: {
						position: 'absolute', //Положение сслыки "Закрыть"
						bottom: 35,
						right: 20
					},
					events: {
						click: function() {
							container.fade(0);
						}
					}
				}).inject(wrapper);

				//Создаем реализации классов Google
				var search = new google.search.WebSearch(),
					control = new google.search.SearchControl(),
					options = new google.search.DrawOptions();

				//Устанавливаем опции Google
				options.setDrawMode(google.search.SearchControl.DRAW_MODE_TABBED);
				options.setInput(searchBox);

				//Устанавливаем опции поиска
				search.setUserDefinedClassSuffix('siteSearch');
				
				search.setLinkTarget(google.search.Search.LINK_TARGET_SELF);

				//Устанавливаем управление поиском
				control.addSearcher(search);
				control.draw(contentContainer,options);
				control.setNoResultsString('Ничего не найдено.');

				//Добавляем ловца событий
				searchBox.addEvents({
					keyup: function(e) {
						if(searchBox.value && searchBox.value != searchBox.get('placeholder')) {
							container.fade(0.9);
							control.execute(searchBox.value);
						}
						else {
							container.fade(0);
						}
					}
				});
				searchBox.removeEvent('focus',searchFn);
			}
		};
		searchBox.addEvent('focus',searchFn);
	});

});