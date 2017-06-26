using System;
using System.Collections.Generic;
using System.Web;
using System.IO;

/// <summary>
/// Summary description for StaticData
/// </summary>
public class StaticData
{
    private static Dictionary<string,string> _dicFootData = null;
    private static Dictionary<string, string> _dicPoiData = null;
    private static Dictionary<string, string> _dicPanoinfoData = null;
    private static Dictionary<string , string> _dicPlaceMapData = null;
	static  StaticData()
	{
		
	}

    /// <summary>
    /// 内存脚印数据
    /// </summary>
    public static Dictionary<string, string> DicFootData
    {
        get 
        {
            if (_dicFootData == null)
            {
                _dicFootData = new Dictionary<string, string>();
                string ApplicationPath = HttpContext.Current.Server.MapPath("./");
                string filePath = ApplicationPath + @"data\" + "foot.data";
                string line = string.Empty;
                using (System.IO.StreamReader reader = new System.IO.StreamReader(filePath))
                {
                    line = reader.ReadLine();
                    while (line != null)
                    {
                        string[] data = line.Split(new string[] { "^&&&&^" }, StringSplitOptions.None);
                        _dicFootData.Add(data[0], data[1]);
                        line = reader.ReadLine();
                    }
                    reader.Dispose();
                    reader.Close();
                }
            }
            return _dicFootData;
        }
    }

    /// <summary>
    /// 内存热点数据
    /// </summary>
    public static Dictionary<string, string> DicPoiData
    {
        get
        {
            if (_dicPoiData == null)
            {
                _dicPoiData = new Dictionary<string, string>();
                string ApplicationPath = HttpContext.Current.Server.MapPath("./");
                string filePath = ApplicationPath + @"data\" + "poi.data";
                string line = string.Empty;
                using (System.IO.StreamReader reader = new System.IO.StreamReader(filePath))
                {
                    line = reader.ReadLine();
                    while (line != null)
                    {
                        string[] data = line.Split(new string[] { "^&&&&^" }, StringSplitOptions.None);
                        _dicPoiData.Add(data[0], data[1]);
                        line = reader.ReadLine();
                    }
                    reader.Dispose();
                    reader.Close();
                }
            }
            return _dicPoiData;
        }
    }

    /// <summary>
    /// 内存拓扑信息
    /// </summary>
    public static Dictionary<string, string> DicPanoinfoData
    {
        get
        {
            if (_dicPanoinfoData == null)
            {
                _dicPanoinfoData = new Dictionary<string, string>();
                string ApplicationPath = HttpContext.Current.Server.MapPath("./");
                string filePath = ApplicationPath + @"data\" + "panoinfo.data";
                string line = string.Empty;
                using (System.IO.StreamReader reader = new System.IO.StreamReader(filePath))
                {
                    line = reader.ReadLine();
                    while (line != null)
                    {
                        string[] data = line.Split(new string[]{"^&&&&^"},StringSplitOptions.None);
                        _dicPanoinfoData.Add(data[0], data[1]);
                        line = reader.ReadLine();
                    }
                    reader.Dispose();
                    reader.Close();
                }
            }
            return _dicPanoinfoData;
        }
    }


    public static Dictionary<string, string> DicPlaceMapData
    {
        get
        {
            if (_dicPlaceMapData == null)
            {
                _dicPlaceMapData = new Dictionary<string, string>();
                string ApplicationPath = HttpContext.Current.Server.MapPath("./");
                string filePath = ApplicationPath + @"data\" + "placemap.data";
                string line = string.Empty;
                using (System.IO.StreamReader reader = new System.IO.StreamReader(filePath))
                {
                    line = reader.ReadLine();
                    while (line != null)
                    {
                        string[] data = line.Split(new string[] { "^&&&&^" }, StringSplitOptions.None);
                        _dicPlaceMapData.Add(data[0], data[1]);
                        line = reader.ReadLine();
                    }
                    reader.Dispose();
                    reader.Close();
                }
                
            }
            return _dicPlaceMapData;
        }
    }

}