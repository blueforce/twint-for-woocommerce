/**
 * TWINT for WooCommerce — Block-Checkout-Integration (ohne Build-Step, via globale wc/wp-Objekte).
 *
 * Registriert die Bezahlmethode "bf_twint". Im Ablauf "request" erscheint ein Pflichtfeld
 * für die TWINT-Handynummer und wird als paymentMethodData (bf_twint_phone) übergeben.
 *
 * @package TWINT_For_WooCommerce
 */
( function () {
	if ( ! window.wc || ! window.wc.wcBlocksRegistry || ! window.wp ) {
		return;
	}

	var registerPaymentMethod = window.wc.wcBlocksRegistry.registerPaymentMethod;
	var getSetting = ( window.wc.wcSettings && window.wc.wcSettings.getSetting ) || function ( k, d ) { return d; };
	var el = window.wp.element.createElement;
	var useState = window.wp.element.useState;
	var useEffect = window.wp.element.useEffect;
	var decode = ( window.wp.htmlEntities && window.wp.htmlEntities.decodeEntities ) || function ( s ) { return s; };
	var __ = ( window.wp.i18n && window.wp.i18n.__ ) || function ( s ) { return s; };
	var sprintf = ( window.wp.i18n && window.wp.i18n.sprintf ) || function ( s ) { return s; };

	var settings = getSetting( 'bf_twint_data', {} );
	var label = decode( settings.title || __( 'TWINT', 'twint-for-woocommerce' ) );
	var description = decode( settings.description || '' );
	var mode = settings.mode || 'send';
	var phone = decode( settings.phone || '' );

	var Content = function ( props ) {
		var onPaymentSetup = props.eventRegistration.onPaymentSetup;
		var responseTypes = props.emitResponse.responseTypes;
		var phoneState = useState( '' );
		var value = phoneState[ 0 ];
		var setValue = phoneState[ 1 ];

		useEffect( function () {
			var unsubscribe = onPaymentSetup( function () {
				if ( 'request' === mode ) {
					var digits = ( value || '' ).replace( /[^0-9]/g, '' );
					if ( digits.length < 6 ) {
						return {
							type: responseTypes.ERROR,
							message: __( 'Bitte gib deine TWINT-Handynummer an, damit wir die Zahlung anfordern können.', 'twint-for-woocommerce' ),
						};
					}
					return {
						type: responseTypes.SUCCESS,
						meta: { paymentMethodData: { bf_twint_phone: value } },
					};
				}
				return { type: responseTypes.SUCCESS };
			} );
			return unsubscribe;
		}, [ value, onPaymentSetup, responseTypes ] );

		var children = [];
		if ( description ) {
			children.push( el( 'p', { key: 'desc' }, description ) );
		}

		if ( 'request' === mode ) {
			children.push( el( 'label', { key: 'lbl', htmlFor: 'bf_twint_phone', style: { display: 'block', marginTop: '8px', fontWeight: 600 } }, __( 'TWINT-Handynummer', 'twint-for-woocommerce' ) ) );
			children.push( el( 'input', {
				key: 'inp',
				id: 'bf_twint_phone',
				type: 'tel',
				value: value,
				placeholder: '+41 79 123 45 67',
				autoComplete: 'tel',
				onChange: function ( e ) { setValue( e.target.value ); },
				style: { width: '100%', padding: '10px', marginTop: '4px' },
			} ) );
			children.push( el( 'span', { key: 'hint', style: { display: 'block', fontSize: '.9em', color: '#666', marginTop: '4px' } }, __( 'Wir senden dir eine TWINT-Zahlungsanforderung an diese Nummer.', 'twint-for-woocommerce' ) ) );
		} else if ( phone ) {
			children.push( el( 'p', { key: 'mphone', style: { marginTop: '8px' } }, sprintf( __( 'Sende den Betrag via TWINT an %s – Details erhältst du nach der Bestellung.', 'twint-for-woocommerce' ), phone ) ) );
		}

		return el( 'div', { className: 'bf-twint-fields' }, children );
	};

	registerPaymentMethod( {
		name: 'bf_twint',
		label: label,
		content: el( Content ),
		edit: el( Content ),
		canMakePayment: function () { return true; },
		ariaLabel: label,
		supports: { features: ( settings.supports || [ 'products' ] ) },
	} );
} )();
