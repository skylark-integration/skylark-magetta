/*******************************************************************************
 * @license
 * Copyright (c) 2012 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials are made 
 * available under the terms of the Eclipse Public License v1.0 
 * (http://www.eclipse.org/legal/epl-v10.html), and the Eclipse Distribution 
 * License v1.0 (http://www.eclipse.org/org/documents/edl-v10.html). 
 * 
 * Contributors: IBM Corporation - initial API and implementation
 ******************************************************************************/
/*global define eclipse document*/

define(["orion/xhr", "domReady!", "orion/plugin"], function(xhr) {
	var provider = new eclipse.PluginProvider();

	function qualifyURL(url) {
		var a = document.createElement('a');
		a.href = url; // set string url
		return a.href;
	}
	var loginData;

	var serviceImpl = {
		getUser: function() {
			if (loginData) {
				return loginData;
			}

			loginData = xhr("POST", "../login", { //$NON-NLS-0$
				headers: {
					"Orion-Version": "1" //$NON-NLS-0$
				},
				timeout: 15000
			}).then(function(result) {
				loginData = result.response ? JSON.parse(result.response) : null;
				return loginData;
			}, function(error) {
				loginData = null;
				return error.response ? JSON.parse(error.response) : null;
			});
			return loginData;
		},
		logout: function() { /* don't wait for the login response, notify anyway */
			loginData = null;
			return xhr("POST", "../logout", { //$NON-NLS-0$
				headers: {
					"Orion-Version": "1" //$NON-NLS-0$
				},
				timeout: 15000
			}).then(function(result) {
				loginData = null;
				return result.response ? JSON.parse(result.response) : null;
			}, function(error) {
				return error.response ? JSON.parse(error.response) : null;
			});
		},
		getAuthForm: function(notify) {
			return qualifyURL(notify ? ('../mixloginstatic/LoginWindow.html?redirect=' + encodeURIComponent(notify) + '&key=FORMOpenIdUser') : '../mixloginstatic/LoginWindow.html');
		},

		getKey: function() {
			return "FORMOpenIdUser";
		},

		getLabel: function() {
			return "Orion workspace server";
		}
	};
	var serviceProps = {
		name: "FORM+OpenId"
	};
	provider.registerServiceProvider("orion.core.auth", serviceImpl, serviceProps);
	provider.connect();
});