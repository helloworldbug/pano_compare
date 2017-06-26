using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class getfootlist : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            string responseStr = string.Empty;
            responseStr = GetFootList();
            HttpContext.Current.Response.Write(responseStr);
            HttpContext.Current.Response.End();
        }
    }

    private string GetFootList()
    {
        string jsonStr = string.Empty;
        string panoid = Discuz.Common.DNTRequest.GetString("panoid");
        if (StaticData.DicFootData.ContainsKey(panoid))
        {
            jsonStr = StaticData.DicFootData[panoid].ToString();
        }
        return jsonStr;
    }
}