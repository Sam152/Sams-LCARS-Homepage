/*
 * Create the rand function to generate php style random numbers.
 */
function rand(from,to)
{
    return Math.floor(Math.random()*(to-from+1)+from);
}

/*
 * Swap two elements in the DOM.
 */
jQuery.fn.swap = function(b){ 
    b = jQuery(b)[0]; 
    var a = this[0]; 
    var t = a.parentNode.insertBefore(document.createTextNode(''), a); 
    b.parentNode.insertBefore(a, b); 
    t.parentNode.insertBefore(b, t); 
    t.parentNode.removeChild(t); 
    return this; 
};
