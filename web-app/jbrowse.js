/**
 * Created with IntelliJ IDEA.
 * User: rnugraha
 * Date: 12-07-13
 * Time: 10:34
 * To change this template use File | Settings | File Templates.
 */


function loadDalliance(resultsTabPanel) {

    // everything starts here ..
    resultsTabPanel.add(genomeBrowser);
    resultsTabPanel.doLayout();

}

/**
 * panel to display gnome browser
 *
 * @type {Ext.Panel}
 */
genomeBrowser = new Ext.Panel(
    {
        id : 'genomeBrowserPanel',
        pluginName : 'jbrowse-plugin',
        title : 'Genome Browser',
        region : 'center',
        split : true,
        height : 90,
        layout : 'fit',
        autoLoad : {
            url : pageInfo.basePath+"/JBrowse/index"
        },
        listeners :
        {
            activate : function(p) {

                console.log("inside jbrowse.js");

                window.onerror=function(msg){
                    if( document.body )
                        document.body.setAttribute("JSError",msg);
                }

                var JBrowse;
                require( { baseUrl: pageInfo.basePath+'/src',
                        packages: [
                            {name:'dojo', location: pageInfo.basePath+'/src/dojo'},
                            {name:'dijit', location: pageInfo.basePath+'/src/dijit'},
                            {name:'dojox', location: pageInfo.basePath+'/src/dojox'},
                            'jszlib',
                            {name: 'lazyload', main: 'lazyload' },
                            {name:'dgrid', location: pageInfo.basePath+'/src/dgrid'},
                            'xstyle',
                            'put-selector',
                            {name: 'jDataView', location: 'jDataView/src', main: 'jdataview'},
                            'JBrowse'
                        ]
                    },
                    [ 'JBrowse/Browser', 'dojo/io-query' ],
                    function (Browser, ioQuery) {
                        var queryParams = ioQuery.queryToObject( window.location.search.slice(1) );
                        var dataRoot = queryParams.data || 'data';
                        JBrowse = new Browser({
                            containerID: "GenomeBrowser",
                            refSeqs: dataRoot + "/seq/refSeqs.json",
                            baseUrl: dataRoot+'/',
                            include: [
                                'jbrowse_conf.json',
                                dataRoot + "/trackList.json"
                            ],
                            nameUrl: dataRoot + "/names/root.json",
                            defaultTracks: "DNA,Annotations,RefSeq",
                            queryParams: queryParams,
                            location: queryParams.loc,
                            forceTracks: queryParams.tracks,
                            initialHighlight: queryParams.highlight,
                            show_nav: queryParams.nav,
                            show_tracklist: queryParams.tracklist,
                            show_overview: queryParams.overview,
                            makeFullViewURL: function( browser ) {

                                // the URL for the 'Full view' link
                                // in embedded mode should be the current
                                // view URL, except with 'nav', 'tracklist',
                                // and 'overview' parameters forced to 1.

                                return browser.makeCurrentViewURL({ nav: 1, tracklist: 1, overview: 1 });
                            },
                            updateBrowserURL: true
                        });
                    });

            }
        },
        collapsible : true
    }
);
