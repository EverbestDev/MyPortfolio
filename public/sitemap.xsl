<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/1999/xhtml"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>EverbestDev Portfolio - XML Sitemap</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style type="text/css">
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #333;
            line-height: 1.6;
            padding: 20px;
            min-height: 100vh;
          }
          
          .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            overflow: hidden;
          }
          
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px;
            text-align: center;
          }
          
          .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            font-weight: 700;
          }
          
          .header p {
            font-size: 1.1em;
            opacity: 0.95;
            margin-bottom: 20px;
          }
          
          .stats {
            display: flex;
            justify-content: center;
            gap: 30px;
            margin-top: 20px;
            flex-wrap: wrap;
          }
          
          .stat-box {
            background: rgba(255,255,255,0.2);
            padding: 15px 25px;
            border-radius: 10px;
            backdrop-filter: blur(10px);
          }
          
          .stat-number {
            font-size: 2em;
            font-weight: bold;
            display: block;
          }
          
          .stat-label {
            font-size: 0.9em;
            opacity: 0.9;
          }
          
          .info-banner {
            background: #f8f9fa;
            border-left: 4px solid #667eea;
            padding: 20px;
            margin: 20px;
            border-radius: 8px;
          }
          
          .info-banner h3 {
            color: #667eea;
            margin-bottom: 10px;
            font-size: 1.2em;
          }
          
          .info-banner ul {
            list-style: none;
            padding-left: 0;
          }
          
          .info-banner li {
            padding: 5px 0;
            padding-left: 25px;
            position: relative;
          }
          
          .info-banner li:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #667eea;
            font-weight: bold;
          }
          
          .content {
            padding: 30px;
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            background: white;
          }
          
          thead {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
          }
          
          th {
            padding: 15px;
            text-align: left;
            font-weight: 600;
            font-size: 0.95em;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          td {
            padding: 15px;
            border-bottom: 1px solid #e9ecef;
          }
          
          tbody tr {
            transition: all 0.3s ease;
          }
          
          tbody tr:hover {
            background: #f8f9fa;
            transform: scale(1.01);
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          
          .url-link {
            color: #667eea;
            text-decoration: none;
            font-weight: 500;
            word-break: break-all;
            transition: color 0.3s ease;
          }
          
          .url-link:hover {
            color: #764ba2;
            text-decoration: underline;
          }
          
          .priority {
            display: inline-block;
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 0.85em;
            font-weight: 600;
          }
          
          .priority-high {
            background: #d4edda;
            color: #155724;
          }
          
          .priority-medium {
            background: #fff3cd;
            color: #856404;
          }
          
          .priority-low {
            background: #f8d7da;
            color: #721c24;
          }
          
          .changefreq {
            font-size: 0.9em;
            color: #6c757d;
            font-style: italic;
          }
          
          .lastmod {
            font-size: 0.9em;
            color: #495057;
          }
          
          .footer {
            background: #f8f9fa;
            padding: 30px;
            text-align: center;
            color: #6c757d;
            border-top: 1px solid #dee2e6;
          }
          
          .footer a {
            color: #667eea;
            text-decoration: none;
            font-weight: 600;
          }
          
          .footer a:hover {
            text-decoration: underline;
          }
          
          @media (max-width: 768px) {
            .header h1 {
              font-size: 1.8em;
            }
            
            .stats {
              flex-direction: column;
              gap: 15px;
            }
            
            table {
              font-size: 0.85em;
            }
            
            th, td {
              padding: 10px 8px;
            }
            
            .container {
              border-radius: 0;
            }
            
            body {
              padding: 0;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🗺️ XML Sitemap</h1>
            <p>EverbestDev Portfolio - Full-Stack &amp; No-Code Web Developer</p>
            <div class="stats">
              <div class="stat-box">
                <span class="stat-number"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></span>
                <span class="stat-label">Total URLs</span>
              </div>
              <div class="stat-box">
                <span class="stat-number">SEO</span>
                <span class="stat-label">Optimized</span>
              </div>
              <div class="stat-box">
                <span class="stat-number">2026</span>
                <span class="stat-label">Updated</span>
              </div>
            </div>
          </div>
          
          <div class="info-banner">
            <h3>📋 About This Sitemap</h3>
            <ul>
              <li>This XML sitemap helps search engines discover and index all pages on this portfolio</li>
              <li>Optimized for recruiter and hiring manager visibility</li>
              <li>Includes priority levels and update frequencies for better crawling</li>
              <li>Submitted to Google Search Console and Bing Webmaster Tools</li>
              <li>Designed to maximize job opportunity discovery</li>
            </ul>
          </div>
          
          <div class="content">
            <table>
              <thead>
                <tr>
                  <th style="width: 50%;">URL</th>
                  <th style="width: 15%;">Priority</th>
                  <th style="width: 15%;">Change Freq</th>
                  <th style="width: 20%;">Last Modified</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <tr>
                    <td>
                      <a class="url-link" href="{sitemap:loc}">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <td>
                      <xsl:variable name="priority" select="sitemap:priority"/>
                      <span>
                        <xsl:attribute name="class">
                          <xsl:text>priority </xsl:text>
                          <xsl:choose>
                            <xsl:when test="$priority &gt;= 0.8">priority-high</xsl:when>
                            <xsl:when test="$priority &gt;= 0.5">priority-medium</xsl:when>
                            <xsl:otherwise>priority-low</xsl:otherwise>
                          </xsl:choose>
                        </xsl:attribute>
                        <xsl:value-of select="sitemap:priority"/>
                      </span>
                    </td>
                    <td>
                      <span class="changefreq">
                        <xsl:value-of select="sitemap:changefreq"/>
                      </span>
                    </td>
                    <td>
                      <span class="lastmod">
                        <xsl:value-of select="sitemap:lastmod"/>
                      </span>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>
          
          <div class="footer">
            <p>
              Generated for <a href="https://everbestdev.vercel.app/">everbestdev.vercel.app</a>
            </p>
            <p style="margin-top: 10px; font-size: 0.9em;">
              This sitemap follows the <a href="https://www.sitemaps.org/protocol.html" target="_blank">Sitemaps XML Protocol</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
