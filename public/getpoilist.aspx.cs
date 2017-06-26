using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class getpoilist : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            string responseStr = string.Empty;
            responseStr = GetPoiData();
            HttpContext.Current.Response.Write(responseStr);
        }
    }

    private string GetPoiData()
    {
        string jsonStr = string.Empty;
        string panoid = Discuz.Common.DNTRequest.GetString("panoid");
        if(StaticData.DicPoiData.ContainsKey(panoid))
        {
            jsonStr = StaticData.DicPoiData[panoid].ToString();
        }
        return jsonStr;
        
    }
}