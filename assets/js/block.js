var el 					= wp.element.createElement,
	Fragment 			= wp.element.Fragment,
    BlockControls 		= wp.editor.BlockControls,
    Toolbar 			= wp.components.Toolbar,
    registerBlockType 	= wp.blocks.registerBlockType;


var stepFORM_projects = [];

(function() {

	function getOptionsRadio(attributes, onChangeRadio) {
		if (stepFORM_projects.length)
			return stepFORM_projects.map(function( item ) {
				return el('div', null, [
					el('label', {
						id: item.virtual_id
					}, [
						el('input', {
							type: 'radio',
							name: 'choose',
							value: item.virtual_id,
							checked: item.virtual_id === attributes.idSelect,
							onClick: function() {
								onChangeRadio(item.virtual_id);
							}
						}),
						item.form_name
					]),
					el('div', {
						className: 'wp-block-stepform-block-openEditor',
						onClick: function() {
							openEditor(item.form_id);
						}
					}, getIconEdit())
				]);
			});
		else
			return el('div', {
				className: 'wp-block-stepform-block-loading',
			}, stepFORM_Lang.loading);
	}

	function getMoreText() {
		if (stepFORM_projects.length > 10)
			return stepFORM_Lang.moreText.replace('[n]', stepFORM_projects.length - 10);
		else
			return '';
	}

	function getIconEdit() {
		return el("svg", {
				width: "24",
				height: "24",
				viewBox: "0 0 24 24",
				fill: "none",
				xmlns: "http://www.w3.org/2000/svg",
			}, [
				el("path", {
					d: "M16.25 4L20 7.75L8.75 19H5V15.25L16.25 4Z",
					stroke: "#707070",
					"stroke-width": "2",
					"stroke-linecap": "round",
					"stroke-linejoin": "round",
				}),
			]);
	}

	function getIconProject() {
		return el("svg", {
				width: "20",
				height: "20",
				viewBox: "0 0 20 20",
				fill: "none",
				xmlns: "http://www.w3.org/2000/svg",
			}, [
				el("path", {
					d: "M8.47644 19.375C7.36626 19.375 6.30654 19.232 5.29729 18.946C4.30485 18.6601 3.53109 18.29 2.976 17.8359L4.06095 15.9183C4.5824 16.3388 5.25523 16.6752 6.07946 16.9275C6.92051 17.163 7.7952 17.2808 8.70353 17.2808C9.84735 17.2808 10.7136 17.1126 11.3024 16.7761C11.9079 16.4229 12.2107 15.9351 12.2107 15.3127C12.2107 14.8081 11.9668 14.4464 11.479 14.2278C11.008 14.0091 10.2679 13.7904 9.25862 13.5718C8.31664 13.3699 7.54288 13.1681 6.93733 12.9662C6.3486 12.7475 5.84397 12.4111 5.42344 11.9569C5.00292 11.486 4.79266 10.8552 4.79266 10.0646C4.79266 9.18991 5.03656 8.42455 5.52437 7.76854C6.029 7.11252 6.73548 6.60789 7.64381 6.25465C8.56896 5.90141 9.63709 5.72479 10.8482 5.72479C11.7397 5.72479 12.606 5.83413 13.447 6.0528C14.2881 6.27147 14.9777 6.56584 15.516 6.9359L14.5572 8.85349C14.0358 8.50025 13.4302 8.23952 12.7406 8.07131C12.0509 7.88628 11.3444 7.79377 10.6211 7.79377C9.52775 7.79377 8.68671 7.9788 8.09797 8.34886C7.50924 8.7021 7.21487 9.18149 7.21487 9.78705C7.21487 10.3253 7.45878 10.7122 7.94658 10.9477C8.43439 11.1664 9.19133 11.385 10.2174 11.6037C11.1426 11.8056 11.8995 12.0074 12.4882 12.2093C13.077 12.4111 13.5732 12.7391 13.9769 13.1933C14.3974 13.6475 14.6077 14.2614 14.6077 15.0352C14.6077 16.3977 14.0442 17.4658 12.9172 18.2396C11.807 18.9965 10.3267 19.375 8.47644 19.375Z",
					fill: "#7E8DFF",
				}),
				el("path", {
					"fill-rule": "evenodd",
					"clip-rule": "evenodd",
					d: "M17.3984 4.40662C14.8484 2.0978 8.2421 0.413858 3.42048 4.81464L2.08922 3.39315C7.40013 -1.72345 15.3665 -0.363335 18.7991 2.93978L17.3984 4.40662Z",
					fill: "#7E8DFF",
				}),
			]);
	}

	function getLogoProject() {
		return el("svg", {
				width: "110",
				height: "28",
				viewBox: "0 0 110 28",
				fill: "none",
				xmlns: "http://www.w3.org/2000/svg",
			}, [
				el("path", {
					d: "M4.90788 23.3369C4.02788 23.3369 3.18788 23.2235 2.38788 22.9969C1.60122 22.7702 0.987882 22.4769 0.547882 22.1169L1.40788 20.5969C1.82122 20.9302 2.35455 21.1969 3.00788 21.3969C3.67455 21.5835 4.36788 21.6769 5.08788 21.6769C5.99455 21.6769 6.68122 21.5435 7.14788 21.2769C7.62788 20.9969 7.86788 20.6102 7.86788 20.1169C7.86788 19.7169 7.67455 19.4302 7.28788 19.2569C6.91455 19.0835 6.32788 18.9102 5.52788 18.7369C4.78122 18.5769 4.16788 18.4169 3.68788 18.2569C3.22122 18.0835 2.82122 17.8169 2.48788 17.4569C2.15455 17.0835 1.98788 16.5835 1.98788 15.9569C1.98788 15.2635 2.18122 14.6569 2.56788 14.1369C2.96788 13.6169 3.52788 13.2169 4.24788 12.9369C4.98122 12.6569 5.82788 12.5169 6.78788 12.5169C7.49455 12.5169 8.18122 12.6035 8.84788 12.7769C9.51455 12.9502 10.0612 13.1835 10.4879 13.4769L9.72788 14.9969C9.31455 14.7169 8.83455 14.5102 8.28788 14.3769C7.74122 14.2302 7.18122 14.1569 6.60788 14.1569C5.74122 14.1569 5.07455 14.3035 4.60788 14.5969C4.14122 14.8769 3.90788 15.2569 3.90788 15.7369C3.90788 16.1635 4.10122 16.4702 4.48788 16.6569C4.87455 16.8302 5.47455 17.0035 6.28788 17.1769C7.02122 17.3369 7.62122 17.4969 8.08788 17.6569C8.55455 17.8169 8.94788 18.0769 9.26788 18.4369C9.60122 18.7969 9.76788 19.2835 9.76788 19.8969C9.76788 20.9769 9.32122 21.8235 8.42788 22.4369C7.54788 23.0369 6.37455 23.3369 4.90788 23.3369Z",
					fill: "#6773FF",
				}),
				el("path", {
					d: "M14.4274 19.8369C14.3874 20.0369 14.3674 20.2235 14.3674 20.3969C14.3674 20.8235 14.4807 21.1502 14.7074 21.3769C14.9474 21.6035 15.3007 21.7169 15.7674 21.7169C16.3274 21.7169 16.8341 21.5502 17.2874 21.2169L17.6874 22.6769C17.0474 23.1169 16.2274 23.3369 15.2274 23.3369C14.3874 23.3369 13.7074 23.1035 13.1874 22.6369C12.6807 22.1569 12.4274 21.5035 12.4274 20.6769C12.4274 20.3969 12.4541 20.1302 12.5074 19.8769L13.6474 14.1969H11.8474L12.1474 12.6169H13.9674L14.4274 10.2969H16.3474L15.8874 12.6169H18.9274L18.6074 14.1969H15.5674L14.4274 19.8369Z",
					fill: "#6773FF",
				}),
				el("path", {
					d: "M21.3771 18.5169V18.6369C21.3771 19.6235 21.6571 20.3769 22.2171 20.8969C22.7771 21.4035 23.6171 21.6569 24.7371 21.6569C25.3904 21.6569 26.0038 21.5502 26.5771 21.3369C27.1504 21.1102 27.6304 20.8102 28.0171 20.4369L28.8371 21.8169C28.3171 22.2969 27.6838 22.6702 26.9371 22.9369C26.1904 23.2035 25.4038 23.3369 24.5771 23.3369C23.5371 23.3369 22.6371 23.1502 21.8771 22.7769C21.1171 22.4035 20.5304 21.8702 20.1171 21.1769C19.7038 20.4835 19.4971 19.6702 19.4971 18.7369C19.4971 17.5502 19.7504 16.4835 20.2571 15.5369C20.7771 14.5902 21.4904 13.8502 22.3971 13.3169C23.3171 12.7835 24.3438 12.5169 25.4771 12.5169C26.9171 12.5169 28.0638 12.9302 28.9171 13.7569C29.7838 14.5702 30.2171 15.6835 30.2171 17.0969C30.2171 17.5235 30.1704 17.9969 30.0771 18.5169H21.3771ZM25.3971 14.1169C24.4504 14.1169 23.6371 14.3835 22.9571 14.9169C22.2771 15.4502 21.8171 16.1835 21.5771 17.1169H28.4171C28.4704 16.1702 28.2171 15.4369 27.6571 14.9169C27.1104 14.3835 26.3571 14.1169 25.3971 14.1169Z",
					fill: "#6773FF",
				}),
				el("path", {
					d: "M39.1637 12.5169C40.0703 12.5169 40.877 12.7035 41.5837 13.0769C42.2903 13.4369 42.8437 13.9635 43.2437 14.6569C43.6437 15.3369 43.8437 16.1435 43.8437 17.0769C43.8437 18.2769 43.5837 19.3502 43.0637 20.2969C42.5437 21.2435 41.8237 21.9902 40.9037 22.5369C39.997 23.0702 38.977 23.3369 37.8437 23.3369C36.937 23.3369 36.157 23.1769 35.5037 22.8569C34.8503 22.5235 34.3503 22.0435 34.0037 21.4169L32.8837 27.0969H30.9637L33.8437 12.6169H35.6837L35.4237 13.9369C36.4103 12.9902 37.657 12.5169 39.1637 12.5169ZM37.7637 21.6569C38.5503 21.6569 39.257 21.4702 39.8837 21.0969C40.5103 20.7102 41.0037 20.1769 41.3637 19.4969C41.7237 18.8169 41.9037 18.0435 41.9037 17.1769C41.9037 16.2302 41.6303 15.4969 41.0837 14.9769C40.537 14.4569 39.757 14.1969 38.7437 14.1969C37.957 14.1969 37.2437 14.3902 36.6037 14.7769C35.977 15.1502 35.4837 15.6769 35.1237 16.3569C34.777 17.0369 34.6037 17.8102 34.6037 18.6769C34.6037 19.6102 34.877 20.3435 35.4237 20.8769C35.9837 21.3969 36.7637 21.6569 37.7637 21.6569Z",
					fill: "#6773FF",
				}),
				el("path", {
					"fill-rule": "evenodd",
					"clip-rule": "evenodd",
					d: "M37.5 8.55311C31.6053 1.34588 17.0702 -1.11406 8.34171 10.0921L7.04895 9.01413C16.5451 -3.17764 32.5306 -0.513144 38.8125 7.72499L39.5334 5.36013L40.9844 5.7406L39.913 9.82157C39.8079 10.2222 39.3979 10.4619 38.9973 10.3568L34.6563 9.69374L35.0367 8.24279L37.5 8.55311Z",
					fill: "#6773FF",
				}),
				el("path", {
					"fill-rule": "evenodd",
					"clip-rule": "evenodd",
					d: "M61.7713 22.5569C62.958 23.1836 64.2913 23.4969 65.7713 23.4969C67.2513 23.4969 68.578 23.1836 69.7513 22.5569C70.938 21.9302 71.8647 21.0636 72.5313 19.9569C73.2113 18.8502 73.5513 17.6036 73.5513 16.2169C73.5513 14.8302 73.2113 13.5836 72.5313 12.4769C71.8647 11.3702 70.938 10.5036 69.7513 9.87689C68.578 9.25022 67.2513 8.93689 65.7713 8.93689C64.2913 8.93689 62.958 9.25022 61.7713 9.87689C60.598 10.5036 59.6713 11.3702 58.9913 12.4769C58.3247 13.5836 57.9913 14.8302 57.9913 16.2169C57.9913 17.6036 58.3247 18.8502 58.9913 19.9569C59.6713 21.0636 60.598 21.9302 61.7713 22.5569ZM67.6913 19.7169C67.118 20.0502 66.478 20.2169 65.7713 20.2169C65.0647 20.2169 64.4247 20.0502 63.8513 19.7169C63.278 19.3836 62.8247 18.9169 62.4913 18.3169C62.158 17.7036 61.9913 17.0036 61.9913 16.2169C61.9913 15.4302 62.158 14.7369 62.4913 14.1369C62.8247 13.5236 63.278 13.0502 63.8513 12.7169C64.4247 12.3836 65.0647 12.2169 65.7713 12.2169C66.478 12.2169 67.118 12.3836 67.6913 12.7169C68.2647 13.0502 68.718 13.5236 69.0513 14.1369C69.3847 14.7369 69.5513 15.4302 69.5513 16.2169C69.5513 17.0036 69.3847 17.7036 69.0513 18.3169C68.718 18.9169 68.2647 19.3836 67.6913 19.7169Z",
					fill: "#384548",
				}),
				el("path", {
					d: "M49.9565 15.3569V12.2769H56.9765V9.21689H45.9965V23.2169H49.9565V18.4169H56.1365V15.3569H49.9565Z",
					fill: "#384548",
				}),
				el("path", {
					"fill-rule": "evenodd",
					"clip-rule": "evenodd",
					d: "M81.7454 19.4969H79.5854V23.2169H75.6254V9.21689H82.0254C83.2921 9.21689 84.3921 9.43022 85.3254 9.85689C86.2587 10.2702 86.9787 10.8702 87.4854 11.6569C87.9921 12.4302 88.2454 13.3436 88.2454 14.3969C88.2454 15.4102 88.0054 16.2969 87.5254 17.0569C87.0587 17.8036 86.3854 18.3902 85.5054 18.8169L88.5254 23.2169H84.2854L81.7454 19.4969ZM84.2454 14.3969C84.2454 13.7436 84.0387 13.2369 83.6254 12.8769C83.2121 12.5169 82.5987 12.3369 81.7854 12.3369H79.5854V16.4369H81.7854C82.5987 16.4369 83.2121 16.2636 83.6254 15.9169C84.0387 15.5569 84.2454 15.0502 84.2454 14.3969Z",
					fill: "#384548",
				}),
				el("circle", {
					cx: "65.8125",
					cy: "16.2367",
					r: "1.78125",
					fill: "#6773FF",
				}),
				el("path", {
					d: "M103.051 23.2169L103.011 15.7969L99.4108 21.8369H97.6508L94.0708 15.9969V23.2169H90.4108V9.21689H93.6708L98.5908 17.2969L103.391 9.21689H106.651L106.691 23.2169H103.051Z",
					fill: "#384548",
				}),
			]);
	}

	function getIconChange() {
		return el("svg", {
				width: "18",
				height: "18",
				viewBox: "0 0 18 18",
				fill: "none",
				xmlns: "http://www.w3.org/2000/svg",
			}, [
				el("path", {
					d: "M1,5.5h3.5c0.736,0,1.393,0.391,1.851,1.001C6.676,5.897,7.08,5.338,7.542,4.839 C6.739,4.016,5.676,3.5,4.5,3.5H1c-0.553,0-1,0.448-1,1S0.447,5.5,1,5.5z",
					fill: "black",
				}),
				el("path", {
					d: "M8.685,8.611C9.236,6.954,10.941,5.5,12.334,5.5h1.838l-1.293,1.293 c-0.391,0.391-0.391,1.023,0,1.414C13.074,8.402,13.33,8.5,13.586,8.5s0.512-0.098,0.707-0.293L18,4.5l-3.707-3.707 c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414L14.172,3.5h-1.838c-2.274,0-4.711,1.967-5.547,4.479L6.315,9.39 C5.674,11.316,4.243,12.5,3.5,12.5H1c-0.553,0-1,0.448-1,1s0.447,1,1,1h2.5c1.837,0,3.863-1.925,4.713-4.479L8.685,8.611z",
					fill: "black",
				}),
				el("path", {
					d: "M12.879,9.793c-0.391,0.391-0.391,1.023,0,1.414l1.293,1.293h-2.338 c-1.268,0-2.33-0.891-2.691-2.108c-0.256,0.75-0.627,1.499-1.09,2.185c0.886,1.162,2.243,1.923,3.781,1.923h2.338l-1.293,1.293 c-0.391,0.391-0.391,1.023,0,1.414c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293L18,13.5l-3.707-3.707 C13.902,9.402,13.27,9.402,12.879,9.793z",
					fill: "black",
				}),
			]);
	}

	function getProjectWidget( id, rnd ) {
		if (id === 0 || id === '0')
			return [
		        	el( 'div', {
		        		className: 'stepform_' + id + ' rnd_' + rnd
		        	}),
		        	el( 'script', null, '' ),
		        ];
        else
		    return [
		        	el( 'div', {
		        		className: 'stepform_' + id + ' rnd_' + rnd
		        	}),
		        	el( 'script', null, '(function(s, t, e, p, f, o, r, m) { s[t] = s[t] || {}; s[t][' + rnd + '] = { id: "' + id + '", rnd: ' + rnd + '}; e.async = true; e.src = p + f; document[m](o)[r](e) } (window,"stepFORM_params",document.createElement("script"),document.location.protocol==="https:"?"https:":"http:","//app.stepform.io/api.js?id=' + id + '","head","appendChild","querySelector"));')
		        ];
	}

	function callToForEach (elems, fn) {
	    [].forEach.call(elems, fn);
	}

    function openCreate() {
    	window.open('https://stepform.io#add');
    }
    function openEditor(id) {
    	window.open('https://stepform.io/dashboard/wysiwyg/' + id);
    }

	registerBlockType( 'stepform/block', {
	    title: 'stepFORM',

	    icon: getIconProject(),

	    category: 'widgets',

	    attributes: {
	        id: {
	        	type: 'string',
	        	default: "0",
	        },
	        idSelect: {
	        	type: 'string',
	        	default: "0",
	        },
	        rnd: {
	        	type: 'integer',
	        	default: 0,
	        },
	        mode: {
	        	type: 'integer',
	        	default: 0,
	        },
	        more: {
	        	type: 'integer',
	        	default: 0,
	        },
	        count: {
	        	type: 'integer',
	        	default: 0,
	        },
	        message: {
	        	type: 'string',
	        	default: '',
	        },
	        settings_link: {
	        	type: 'string',
	        	default: '',
	        },
	    },

	    edit: function( props ) {
	    	var attributes = props.attributes;

	        function onChangeRadio ( newId ) {
	        	props.setAttributes( { idSelect: newId } );
	        }

	        function onClickSave( event ) {
	        	props.setAttributes( { 
	        		id: attributes.idSelect, 
	        		mode: 1,
	        		rnd: Date.now(),
	        	} );

	        	setTimeout(function() {
	        		props.setAttributes( { mode: 2 } );
	        	}, 1000);

	        	setTimeout(function() {
	        		props.setAttributes( { mode: 3 } );
	        	}, 1500);

	        	event.preventDefault();
	        }

	        function onClickTool() {
	        	if (attributes.mode === 3) {
	        		props.setAttributes( { 
	        			id: attributes.idSelect, 
	        			mode: 4,
	        			more: 0,
	        		} );

	        		setTimeout(function() {
		        		props.setAttributes( { mode: 5 } );
		        	}, 600);

		        	setTimeout(function() {
		        		props.setAttributes( { mode: 0 } );
		        	}, 1200);
	        	}

	        	event.preventDefault();
	        }

	        function onClickMore() {
	        	props.setAttributes( { more: 1 } );
	        }

	        function getBlockTools() {
		        return el(Toolbar, {
		        	isCollapsed: false,
		        	icon: getIconChange(),
		        	label: stepFORM_Lang.edit,
		        	controls: [{
		        		icon: getIconChange(),
		        		title: stepFORM_Lang.change,
		        		isActive: false,
		        		onClick: onClickTool,
		        		className: props.className + '-tool ' + props.className + '-tool-' + attributes.mode,
		        	}]
		        })
	        }

	        function getBlockSettings() {
	        	return el( 'div', {
		        	className: props.className + '-edit',
		        }, [
			        el('div', {
			        	className: props.className + '-header',
			        }, [
			        	getLogoProject(),
			        	(
			        		attributes.message
			        		? ''
			        		: el('button', {
					        	className: 'components-button is-button is-default is-large',
					        	onClick: openCreate,
					        }, stepFORM_Lang.createForm)
					    )
			        ]),
			        (
			        	attributes.message
			        	? el('a', {
				        	className: props.className + '-settings',
			        		href: attributes.settings_link,
			        	}, attributes.message)
			        	: [
			        		el('div', {
					        	className: props.className + '-title',
					        }, stepFORM_Lang.chooseTitle),
			        		el('form', {
					        	className: props.className + '-form ' + props.className + '-more-' + attributes.more,
					        }, getOptionsRadio(attributes, onChangeRadio)),
					        el('a', {
					        	className: props.className + '-more',
					        	href: 'javascript://',
					        	onClick: onClickMore,
					        }, getMoreText()),
					        el('div', {
					        	className: props.className + '-footer',
					        }, [
					        	el('button', {
						        	className: 'components-button is-button is-default is-large is-primary',
						        	onClick: onClickSave,
						        }, stepFORM_Lang.apply)
					        ]),
					    ]
			        )
		        ] );
	        }

	        function getBlockZone() {
	        	return el( 'div', null, [
			        el('div', {
			        	className: props.className + '-mode ' + props.className + '-mode-' + attributes.mode,
			        }),
			        el( 'div', {
			        	className: props.className
			        }, getProjectWidget(attributes.id, attributes.rnd) ),
			        el( 'div', {
			        	className: props.className + '-overlay'
			        }, ''),
			        getBlockSettings(),
		        ] );
	        }

	        function updProjects() {
	    		if (stepFORM_projects.length)
	    			return;

	    		var data = {
					action: 'stepFORM_load_forms'
				};
				jQuery.post( ajaxurl, data, function(response) {
					var json = JSON.parse(response);

					if (json.status == 'ok') {
						stepFORM_projects = json.data;

						props.setAttributes( { message: '', count: attributes.count++ } );
					}
					else {
						props.setAttributes( { message: json.message, settings_link: json.settings_link } );
					}
				});
	    	}

	    	function updFrames() {
	    		setTimeout(function() {
	    			var widgets = document.getElementsByClassName('wp-block-stepform-block');
					callToForEach(widgets, function(widget) {
						eval(widget.getElementsByTagName('SCRIPT')[0].innerHTML);
					});
	    		}, 10);
	    	}

	    	updProjects();
	    	updFrames();

	        return (
	            el(
	                Fragment,
	                null,
	                el(
	                    BlockControls,
	                    null,
	                    getBlockTools()
	                ),
	                getBlockZone()
	            )
	        );
	    },

	    save: function( props ) {
	    	var id = props.attributes.idSelect;
	    	var rnd = props.attributes.rnd;

			if (id)
	        	return el( 'div', {
		        	className: props.className
		        }, getProjectWidget(id, rnd) );
	        else
	        	return '';
	    }
	} );

})();