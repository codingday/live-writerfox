using System;

namespace livewriterWrapper
{

	class liveWriterFox
	{
		/// <summary>
		/// The main entry point for the application.
		/// </summary>
		[STAThread]
		static void Main(string[] args)
		{
			
			Debug(args);

			WindowsLiveWriterApplicationLib.WindowsLiveWriterApplicationClass bloggar;
			try
			{
				 bloggar = new WindowsLiveWriterApplicationLib.WindowsLiveWriterApplicationClass();
			}
			catch
			{
				System.Windows.Forms.MessageBox.Show("Windows Live Writer is not installed.");
				return;
			}
			if (args.Length == 1)
			{
				if (args[0] == "new")
					bloggar.NewPost();
				else if (args[0] == "open")
					bloggar.OpenPost();
			}
			//[title,url,selection];
			if (args.Length == 2)
			{				
				bloggar.BlogThisLink(args[0].Trim("'\"".ToCharArray()),args[1].Trim("'\"".ToCharArray()),null);
			}
			else if (args.Length == 3)
			{
				bloggar.BlogThisSnippet(args[0].Trim("'\"".ToCharArray()), args[1].Trim("'\"".ToCharArray()),null,args[2].Trim("'\"".ToCharArray()),true);
			}
		}
		[System.Diagnostics.Conditional("DEBUG")]
		private static void Debug(string[] args)
		{
			Console.WriteLine("Run");
			foreach (string s in args)
			{
				Console.WriteLine(s);
			}
			Console.WriteLine("End");
			Console.ReadLine();
		}

	}
}
