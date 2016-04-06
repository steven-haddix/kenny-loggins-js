var helper = require('./helper');
/**
 * Abstract base class for other appenders. 
 * It is doing nothing.
 *
 * @constructor
 * @param {Log4js.Logger} logger log4js instance this appender is attached to
 * @author Stephan Strittmatter
 */
function Appender() {
	/**
	 * Reference to calling logger
	 * @type Log4js.Logger
	 * @private
	 */
	 this.logger = null;
}

Appender.prototype = {
	/** 
	 * appends the given loggingEvent appender specific
	 * @param {Log4js.LoggingEvent} loggingEvent loggingEvent to append
	 */
	doAppend: function(loggingEvent) {
		return;
	},
	/** 
	 * clears the Appender
	 */
	doClear: function() {
		return;
	},
	
	/**
	 * Set the Layout for this appender.
	 * @param {Log4js.Layout} layout Layout for formatting loggingEvent
	 */
	setLayout: function(layout){
		this.layout = layout;
	},
	/**
	 * Set reference to the logger.
	 * @param {Log4js.Logger} the invoking logger
	 */
	setLogger: function(logger){
		// add listener to the logger methods
		logger.onlog.addListener(
			helper.bind(this.doAppend, this)
		);

		logger.onclear.addListener(
			helper.bind(this.doClear, this)
		);
	
		this.logger = logger;
	}
};

module.exports = Appender;