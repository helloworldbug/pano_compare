using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class asp_hd : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
         string url = "http://210.14.79.177/Controls/ImageViewer.aspx?img=119a89935b254d7d850d369cf9ca4a4c&width=4000&height=7473";// "http://www.artmuseumonline.org/hssmy/1230.jhtml";// "210.14.79.177/Controls/ImageViewer.aspx?img=119a89935b254d7d850d369cf9ca4a4c&width=4000&height=7473";
         Response.Write(getStringFromUrl(url));
    }
    public string getStringFromUrl(string url)//http://www.artmuseumonline.org/hssmy/1230.jhtml
    {
        try
        {
            StringBuilder sb = new StringBuilder();
            //用于作为读取内容操作的缓冲区
            byte[] buf = new byte[819200];
            // 请求该页面
            HttpWebRequest request = (HttpWebRequest)
            WebRequest.Create(url);
            request.Method = "get";
            //request.ContentType = "application/x-www-form-urlencoded;charset=UTF-8";
            //获取返回的数据（通过相应）
            HttpWebResponse response = (HttpWebResponse)
            request.GetResponse();
            //将读取到的数据放入到流里面
            Stream resStream = response.GetResponseStream();
            string tempString = null;
            int totalcount = 0;
            int count = 0;
            //FileStream fs = File.Create(Server.MapPath("urltext.html"));
            do
            {
                //读取部分的数据
                count = resStream.Read(buf, 0, buf.Length);
                //确定读取的数据不为空
                if (count != 0)
                {
                    //转换内容格式byte 到 ascii
                    tempString = Encoding.UTF8.GetString(buf, 0, count);
                    //fs.Write(buf, 0, count);//写入文件
                    //加入到字符串
                    sb.Append(tempString);
                }
                totalcount += count;
            }
            while (count > 0);
            resStream.Close();
            //fs.Close(); 
            return sb.ToString();
        }
        catch (Exception e) { }
        return null; 
    }

}