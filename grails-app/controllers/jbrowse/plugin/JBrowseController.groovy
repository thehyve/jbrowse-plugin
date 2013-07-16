package jbrowse.plugin
import org.json.*

class JBrowseController {

    def index() {
        render (view: "main.gsp")
    }

    def loadScripts = {

        def scripts = [

                servletContext.contextPath+pluginContextPath+'/src/dojo/dojo.js',
                servletContext.contextPath+pluginContextPath+'/src/dojo/nls/dojo_ROOT.js',
                servletContext.contextPath+pluginContextPath+'/src/dijit/nls/loading.js',
                servletContext.contextPath+pluginContextPath+'/src/dijit/nls/common.js',
                servletContext.contextPath+pluginContextPath+'/src/dijit/form/nls/validate.js',
                servletContext.contextPath+pluginContextPath+'/src/dijit/form/nls/ComboBox.js',
                servletContext.contextPath+pluginContextPath+'/src/dojox/form/nls/Uploader.js',
                servletContext.contextPath+pluginContextPath+'/src/dojo/cldr/nls/number.js',
                servletContext.contextPath+pluginContextPath+'/jbrowse.js'
        ]

        JSONObject result = new JSONObject()
        JSONArray rows = new JSONArray()

        for (file in scripts) {
            def m = [:]
            m["path"] = file.toString()
            m["type"] = "script"
            rows.put(m);
        }

        result.put("success", true)
        result.put("totalCount", scripts.size())
        result.put("files", rows)

        response.setContentType("text/json")
        response.outputStream << result.toString()
    }
}
