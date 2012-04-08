function HashString(str)
{
	var hash = 5381;
	for (var i = 0; i < str.length; i++)
	{
		var c = str.charCodeAt(i);
		hash = c + (hash << 6) + (hash << 16) - hash;
	}
	return hash;
}


// Pads to 6 nibbles
function dec2hex(i)
{
	return (i + 0x1000000).toString(16).substr(-6).toUpperCase();
}


// Simple 24-bit RGB ops
function lerp8(a, b, t)
{
	a &= 0xFF;
	b &= 0xFF;
	return Math.floor(a + (b - a) * t);
}
function lerprgb(a, b, t)
{
	var c = lerp8(a, b, t);
	c |= lerp8(a >> 8, b >> 8, t) << 8;
	c |= lerp8(a >> 16, b >> 16, t) << 16;
	return c;
}


// Adapted from http://www.javascriptkit.com/javatutors/setcss3properties.shtml
function getsupportedprop(proparray)
{
	//reference root element of document
	var root=document.documentElement;

	//loop through possible properties
	for (var i = 0; i < proparray.length; i++)
	{
		//if the property value is a string (versus undefined)
		if (typeof root.style[proparray[i]] == "string")
			return proparray[i];
	}
}
var shadowprop = getsupportedprop(['boxShadow', 'MozBoxShadow', 'WebkitBoxShadow']);
var roundborderprop = getsupportedprop(['borderRadius', 'MozBorderRadius', 'WebkitBorderRadius']);
var csstransform = getsupportedprop(['transform', 'MozTransform', 'WebkitTransform', 'msTransform', 'OTransform']) ;
function changecssproperty(target, prop, value, action)
{
	if (typeof prop != "undefined")
		target.style[prop] = (action == "remove") ? "" : value;
}


function getOffset( el )
{
	var _x = 0;
	var _y = 0;
	while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) )
	{
		_x += el.offsetLeft - el.scrollLeft;
		_y += el.offsetTop - el.scrollTop;
		el = el.offsetParent;
	}
	return { top: _y, left: _x };
}