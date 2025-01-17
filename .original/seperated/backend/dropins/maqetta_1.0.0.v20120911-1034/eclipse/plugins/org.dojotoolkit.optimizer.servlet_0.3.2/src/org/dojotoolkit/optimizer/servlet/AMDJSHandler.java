/*
    Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
    Available via Academic Free License >= 2.1 OR the modified BSD license.
    see: http://dojotoolkit.org/license for details
*/
package org.dojotoolkit.optimizer.servlet;

import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.dojotoolkit.optimizer.JSAnalysisData;
import org.dojotoolkit.optimizer.Localization;
import org.dojotoolkit.optimizer.Util;

public class AMDJSHandler extends JSHandler {
	private static Logger logger = Logger.getLogger("org.dojotoolkit.optimizer");
	
	public AMDJSHandler(String configFileName) {
		super(configFileName);
	}
	
	@SuppressWarnings("unchecked")
	protected void customHandle(HttpServletRequest request, Writer writer, JSAnalysisData analysisData, JSAnalysisData[] excludes) throws ServletException, IOException {
		if (analysisData != null) {	
			writer.write("zazl.addAnalysisKey('"+analysisData.getKey()+"');\n");
			String suffixCode = (String)config.get("suffixCode");
			if (suffixCode != null) {
				writer.write(suffixCode);
			}
			String[] dependencies = analysisData.getDependencies();
			Map<String, List<Map<String, String>>> pluginRefs = analysisData.getPluginRefs();
			List<Localization> localizations = new ArrayList<Localization>();
			Map<String, Object> amdConfig = (Map<String, Object>)config.get("amdconfig");
			String i18nPluginId = (String)amdConfig.get("i18nPluginId");
			List<String> seen = new ArrayList<String>();
			for (JSAnalysisData exclude : excludes) {
				Map<String, List<Map<String, String>>> excludePluginRefs = exclude.getPluginRefs();
				for (String excludePluginId : excludePluginRefs.keySet()) {
					if (i18nPluginId != null && i18nPluginId.equals(excludePluginId)) {
						List<Map<String, String>> excludePluginRefInstances = excludePluginRefs.get(excludePluginId);
						for (Map<String, String> excludePluginRefInstance : excludePluginRefInstances) {
							seen.add(excludePluginRefInstance.get("normalizedName"));
						}
					}
				}
			}
			for (String pluginId : pluginRefs.keySet()) {
				List<Map<String, String>> pluginRefInstances = pluginRefs.get(pluginId);
				for (Map<String, String> pluginRefInstance : pluginRefInstances) {
					String value = pluginRefInstance.get("value");
					logger.logp(Level.FINE, getClass().getName(), "customHandle", "plugin ref ["+pluginId+"]["+pluginRefInstance.get("normalizedName")+"]");
					if (value != null) {
						logger.logp(Level.FINE, getClass().getName(), "customHandle", "plugin ref ["+pluginId+"]["+pluginRefInstance.get("normalizedName")+"] has write value["+value+"]");
						writer.write(value);
					}
				}
				if (i18nPluginId != null && i18nPluginId.equals(pluginId)) {
					for (Map<String, String> pluginRefInstance : pluginRefInstances) {
						String bundlePackage = pluginRefInstance.get("normalizedName");
						String moduleUrl = pluginRefInstance.get("moduleUrl");
						if (!seen.contains(bundlePackage)) {
							seen.add(bundlePackage);
							String modulePath = bundlePackage.substring(0, bundlePackage.lastIndexOf('/'));
							moduleUrl = moduleUrl.substring(0, moduleUrl.lastIndexOf('/'));
							String bundleName = bundlePackage.substring(bundlePackage.lastIndexOf('/')+1);	
							logger.logp(Level.FINE, getClass().getName(), "customHandle", "i18n plugin ref ["+bundlePackage+"]["+modulePath+"]["+bundleName+"]");
							Localization localization = new Localization(bundlePackage, modulePath, bundleName, moduleUrl);
							localizations.add(localization);
						}
					}
				}
			}
			if (localizations.size() > 0) {
				Util.writeAMDLocalizations(resourceLoader, writer, localizations, request.getLocale());
			}
			for (String dependency : dependencies) {
				String path = Util.normalizePath(dependency);
				String content = resourceLoader.readResource(path);
				if (content != null) {
					logger.logp(Level.FINE, getClass().getName(), "customHandle", "dependency ["+path+"]");
					String uri = dependency.substring(0, dependency.indexOf(".js"));
					int missingNameIndex = lookForMissingName(uri, analysisData.getModulesMissingNames());
					if (missingNameIndex != -1) {
						StringBuffer modifiedSrc = new StringBuffer(content.substring(0, missingNameIndex));
						modifiedSrc.append("'"+getMissingNameId(uri, analysisData.getModulesMissingNames())+"', ");
						modifiedSrc.append(content.substring(missingNameIndex));
						content = modifiedSrc.toString();
					}
					
					writer.write(compressorContentFilter.filter(content,path));
				}
			}
		}
	}
	
	private int lookForMissingName(String uri, List<Map<String, Object>> modulesMissingNamesList) {
		int index = -1;
		for (Map<String, Object> modulesMissingNames : modulesMissingNamesList) {
			if (modulesMissingNames.get("uri").equals(uri)) {
				index = ((Long)modulesMissingNames.get("nameIndex")).intValue();
				break;
			}
		}
		return index;
	}

	private String getMissingNameId(String uri, List<Map<String, Object>> modulesMissingNamesList) {
		String id = null;
		for (Map<String, Object> modulesMissingNames : modulesMissingNamesList) {
			if (modulesMissingNames.get("uri").equals(uri)) {
				id = ((String)modulesMissingNames.get("id"));
				break;
			}
		}
		return id;
	}
}
