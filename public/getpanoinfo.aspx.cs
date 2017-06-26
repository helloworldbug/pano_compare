using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Discuz.Common;

public partial class getpanoinfo : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            string responseStr = string.Empty;
            responseStr = GetPnaoInfo();
            HttpContext.Current.Response.Write(responseStr);
            HttpContext.Current.Response.End();
            
        }
    }

    private string GetPnaoInfo()
    {
        string placeid = Discuz.Common.DNTRequest.GetString("placeid");
        string panoid = Discuz.Common.DNTRequest.GetString("panoid");
        string key = placeid + "_" + panoid;
        string jsonStr = string.Empty;
        if (StaticData.DicPanoinfoData.ContainsKey(key))
        {
            jsonStr = StaticData.DicPanoinfoData[key].ToString();
        }
        return jsonStr;
    }
}