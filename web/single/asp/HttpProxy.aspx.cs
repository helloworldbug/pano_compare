using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Net;
using System.IO;

public partial class HttpProxy : System.Web.UI.Page
{

    public static string param = "url=";
    public static string paramWithCopy = "curl=";
    public static string root = "E:\\project2\\fhouse\\PanoHtmlProject\\three";
    public static string logFile = @"F:/cache/log/log.txt";
    public string ex;
    int keepCopy = 0;
    protected void Page_Load(object sender, EventArgs e)
    {
        byte[] data = null;
        try
        {
            string wholeUrl = Request.Url.ToString();

            if (wholeUrl != null)
            {
                    string url = Request.Form["url"].ToString();
                    string path = null;
                    if (keepCopy > 0)
                    {

                        path = UrlToPath(url);

                        if (File.Exists(path))
                        {
                            data = GetContentByFile(path);

                        }
                    }

                    if (data == null && !String.IsNullOrEmpty(url))
                    {
                        // string url = "http://74.125.71.160/maps/api/staticmap?format=jpg&center=31.2314572753906,121.493626980252&zoom=16&size=580x530&markers=color:red%7Clabel:C%7C31.2314572753906,121.493626980252&sensor=false&language=zh_CN";
                        data = GetContentByUrl(url);
                        if (data != null)
                        {
                            if (path != null)
                                SaveContent(path, data);
                        }
                        else
                            SaveLog(logFile, System.Text.Encoding.Default.GetBytes(url));
                    }

                    if (data != null)
                        Response.BinaryWrite(data);

                }

            
        }
        catch (Exception e2)
        {
            ex = e2.ToString();
            SaveLog(logFile, System.Text.Encoding.Default.GetBytes(ex));
        }
    }

    string invalidChars = @"\:?|<>*";
    private string fliterInvalidChars(string name)
    {
        string result = name;
        if (name == null)
            return null;
        foreach (char c in invalidChars)
        {
            result = result.Replace(c, '_');
        }
        return result;
    }
    private string UrlToPath(string url)
    {
        string path = root;
        if (!Directory.Exists(path))
        {
            Directory.CreateDirectory(path);
        }
        string tmp = url;
        if (url.StartsWith(@"http://"))
        {
            tmp = url.Substring(7);
        }
        else if (url.StartsWith(@"https://"))
        {
            tmp = url.Substring(8);
        }

        string folder = "";

        int indexOfServer = tmp.IndexOf("/");
        tmp = tmp.Replace('?', '/');
        tmp = tmp.Replace('&', '/');
        string fileName = "";
        string[] tmpArray = null;
        tmp = fliterInvalidChars(tmp);
        tmpArray = tmp.Split('/');
        for (int i = 0; i < tmpArray.Length - 1; i++)
        {
            path += @"/" + tmpArray[i];
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
        }
        fileName = tmpArray[tmpArray.Length - 1];
        if (fileName.Length > 255)
        {
            fileName = GetBriefFileName(fileName);
        }
        tmpArray = fileName.Split('&');
        if (tmpArray.Length > 1)
        {
            for (int i = 0; i < tmpArray.Length - 1; i++)
            {
                path += @"/" + tmpArray[i];
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }
            }
            fileName = tmpArray[tmpArray.Length - 1];
        }


        string filePath = path + @"/" + fileName;

        return filePath;

    }

    private string GetBriefFileName(string fileName)
    {
        string briefName = "";
        int value = 0;
        int times = fileName.Length / 255 + 1;
        foreach (char c in fileName)
        {
            if (value == times)
            {
                briefName += c;
                value = 0;
            }
            else
            {
                value++;
            }
        }

        return briefName;
    }
    private void SaveContent(string path, byte[] data)
    {
        //string path = @"F:/cache/" + "test" + @".jpg";
        FileStream fs = null;
        try
        {
            if (File.Exists(path))
            {
                return;
            }
            fs = File.Create(path);

            //获得字节数组

            //开始写入
            fs.Write(data, 0, data.Length);
            //清空缓冲区、关闭流
            fs.Flush();
        }
        catch (Exception e) { }
        finally
        {
            if (fs != null)
                fs.Close();
        }
    }
    private byte[] GetContentByFile(string path)
    {
        FileStream sFile = null;
        try
        {
            sFile = new FileStream(path, FileMode.Open);
            using (MemoryStream ms = new MemoryStream())
            {
                Byte[] buffer = new Byte[10240];
                int current = 0;
                while ((current = sFile.Read(buffer, 0, buffer.Length)) != 0)
                {
                    ms.Write(buffer, 0, current);
                }

                return ms.ToArray();
            }

        }
        catch (IOException e)
        {

        }
        finally
        {
            if (sFile != null)
                sFile.Close();

        }
        return null;

    }
    private byte[] GetContentByUrl(string url)
    {
        string fileURL = url; // GetImgUrlPrefix() + picName;
        try
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(fileURL);
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            if (response.StatusCode != HttpStatusCode.OK)
                return null;
            using (Stream stream = response.GetResponseStream())
            {
                using (MemoryStream ms = new MemoryStream())
                {
                    Byte[] buffer = new Byte[10240];
                    int current = 0;
                    while ((current = stream.Read(buffer, 0, buffer.Length)) != 0)
                    {
                        ms.Write(buffer, 0, current);
                    }
                    return ms.ToArray();
                }
            }
        }
        catch (Exception ex)
        {
            string str = string.Format(fileURL + "\r\n异常类型：{0}\r\n异常消息：{1}\r\n异常信息：{2}\r\n", ex.GetType().Name, ex.Message, ex.StackTrace);
            SaveLog(logFile, System.Text.Encoding.Default.GetBytes(str));
        }
        return null;
    }

    private void SaveLog(string path, byte[] data)
    {
        //string path = @"F:/cache/" + "test" + @".jpg";
        FileStream fs = null;
        try
        {
            if (!File.Exists(path))
            {
                fs = File.Create(path);
            }


            //获得字节数组

            //开始写入
            fs.Write(data, 0, data.Length);
            //清空缓冲区、关闭流
            fs.Flush();
        }
        catch (Exception e) { }
        finally
        {
            if (fs != null)
                fs.Close();
        }
    }
}