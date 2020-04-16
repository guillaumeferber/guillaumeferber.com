var ElementSetModule = (function(doc) {
    var config = {};

    var init = function(conf) {
        this.config = Object.assign({}, conf);
        // methods
        _addEventListeners(this.config);
        _setAria();
    }

    var _addEventListeners = function(config) {
        // can be multiple tabsets in the document
        var containerList = doc.querySelectorAll(config.nodeList[0]);
        // map over it
        Array.from(containerList).map(function(container) {
            // get children
            // first: list items
            var tabListItemList = container && container.querySelectorAll(config.tabListItemTag);
            // then: content items
            var tabContentList = container && container.querySelectorAll(config.nodeList[1]);
            if (tabListItemList) {
                for (var i = 0; i <  tabListItemList.length; i++) {
                    tabListItemList[i].addEventListener('click', function(e) {
                        e.preventDefault();
                        var targetId = e.target.getAttribute(config.tabListItemTargetAttr).substring(1);
                        Array.from(tabListItemList).map(function(item) {
                            if (item.getAttribute(config.tabListItemTargetAttr) !== e.target.getAttribute(config.tabListItemTargetAttr)) {
                                item.classList.remove(config.activeClass);
                            }});
                        Array.from(tabContentList).map(function(item) {
                            item.classList.remove(config.activeClass);
                            if (targetId === item.id) {
                                item.classList.add(config.activeClass);
                            }
                        });
                        e.target.classList.add(config.activeClass);
                    }, false);
                }
            }
        });
    }

    var _setAria = function() {
        //
    }

    return {
        init: init
    }


})(window.document);

var RouterLinkModule = (function(doc) {
    function init(conf) {
        // methods
        _addEventListeners(conf);
    }

    var _addEventListeners = function(config) {
        var nav = doc.querySelector(config.nav);
        if (nav) {
            [].map.call(nav.querySelectorAll(config.itemList), function(link) {
                link.addEventListener('click', function(evt) {
                    // evt.preventDefault();
                    [].map.call(nav.querySelectorAll(config.itemList), function(item) {
                        item.classList.remove('active');
                    });
                    link.classList.add('active');
                }, false);
            });
        }
    }

    return {
        init: init
    }
})(window.document);

var NavigationModule = (function(doc) {
    function init(conf) {
        // methods
        _addEventListeners(conf);
    }

    function _addEventListeners (config) {
        var selector = doc.querySelector(config.elem);
        if (!selector) { return; }
        var body = doc.querySelector('body');
        window.onload = function(e) {
            if (body.clientWidth < 768) {
                body.classList.contains('open') ? body.classList.remove('open') : null;
                selector.checked = false;
            }
        }
        window.addEventListener('resize', function(e) {
            body.clientWidth < 768 ? body.classList.remove('open') : !body.classList.contains('open') ? body.classList.add('open') : null;
        }, false);

        selector.addEventListener('click', function(event) {
            var state = event.target.checked;
            state ? body.classList.add('open') : body.classList.remove('open');
        }, false);
    }

    return {
        init: init
    }



})(window.document)
// Main module
var MainModule = (function(ElementSetModule, RouterLinkModule, NavigationModule) {
    return {
        init: function(configuration) {
            ElementSetModule.init(configuration.tabSet);
            RouterLinkModule.init(configuration.routerLink);
            NavigationModule.init(configuration.navigation);
        }
    }
})(ElementSetModule, RouterLinkModule, NavigationModule);
