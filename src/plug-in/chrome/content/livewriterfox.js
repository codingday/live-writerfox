function blogit() 
{
	var pagePost  = true;
	var location;
	var doctitle;
    var Nav  = window.getBrowser().webNavigation;
	if(Nav.currentURI)
		location = Nav.currentURI.spec;
	else
		location = gURLBar.value;  
      
	if(Nav.document.title)
	{
		doctitle = Nav.document.title;
	} 
	else
		doctitle = location;

	var title = "\"" + doctitle + "\"";
	var url = "\"" + location  + "\"";
	var focusedWindow = document.commandDispatcher.focusedWindow;
	
	var selection = null;
	if ( focusedWindow.getSelection().toString().length>0) 
	{
	  pagePost = false;
		selection = "\"" +focusedWindow.getSelection().toString() + "\"";
	}

	// create an nsILocalFile for the executable
	var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
	var pathvalue=Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("TmpD",Components.interfaces.nsIFile).path;
	
	file.initWithPath(pathvalue);
	file.append("liveWriter.exe");
	
	_CreateFile(file);
	
	// create an nsIProcess
	var process = Components.classes["@mozilla.org/process/util;1"].createInstance(Components.interfaces.nsIProcess);
	process.init(file);
	
	var args = null;
	if (pagePost)
	{
		args = [title,url];
	}
	else
	{
		args = [title,url,selection];
	}
	process.run(false, args, args.length);
}

function _CreateFile(file)
{
	const cc=Components.classes;
	const ci=Components.interfaces;
	
	const ios=Components.classes['@mozilla.org/network/io-service;1'].getService(Components.interfaces.nsIIOService);
	const bis=Components.classes['@mozilla.org/binaryinputstream;1'].createInstance(Components.interfaces.nsIBinaryInputStream);
	
	var channel;
	bis.setInputStream((channel= ios.newChannel("chrome://livewriterfox/content/livewriterfox.exe",null,null)).open());
	const bytesCount=channel.contentLength;
	
	const os=Components.classes["@mozilla.org/network/file-output-stream;1"].createInstance(Components.interfaces.nsIFileOutputStream);
	
	os.init(file,0x04 | 0x08 | 0x20 , -1, 0);
	var bos=Components.classes['@mozilla.org/binaryoutputstream;1'].createInstance(Components.interfaces.nsIBinaryOutputStream);
	bos.setOutputStream(os);
	bos.writeByteArray(bis.readByteArray(bytesCount),bytesCount);
	bos.close();
}

