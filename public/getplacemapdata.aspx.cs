using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class getplacemapdata : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            string responseStr = string.Empty;
            responseStr = GetPlaceMapData();
            HttpContext.Current.Response.Write(responseStr);
            HttpContext.Current.Response.End();
        }
    }


    private string GetPlaceMapData()
    {
        string jsonStr = string.Empty;
        string placeid = Discuz.Common.DNTRequest.GetString("placeid");
        
        if (StaticData.DicPlaceMapData.ContainsKey(placeid))
        {
            jsonStr = StaticData.DicPlaceMapData[placeid].ToString();
        }
        return jsonStr;

    }
}