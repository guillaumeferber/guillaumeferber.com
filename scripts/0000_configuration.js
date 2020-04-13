var configuration = {
    tabSet: {
        nodeList: ['.c-tabset', '.c-tab-content'],
        activeClass: 'active',
        tabListItemTag: 'a',
        tabListItemTargetAttr: 'href'
    },
    routerLink: {
        nodeList: {
            selector: '[selector]',
            itemList: '[name=candidate_apply]',
            nav: '.c-header nav > ul'
    },
        form: {
            id: '#candidate',
            input: 'candidate_expertise'
        },
        targetAttr: 'routerLink'
    }
};
