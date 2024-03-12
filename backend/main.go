package main

import (
	"backend/savecontent"
	"net/http"

	"github.com/gin-gonic/gin"
)

type RequestBody struct {
	Message string `json:"message"`
}

type ResponseBody struct {
	Message string `json:"message"`
}

func main() {
	router := gin.Default()

	router.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Accept")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}
		c.Next()
	})
	// 設置路由
	router.POST("/api/modify", ModifyHandler)
	router.POST("/api/savecontent", savecontent.SaveContent)
	router.Static("/", "../frontend/build")
	// 启动服务
	router.Run(":7000")
}

func ModifyHandler(c *gin.Context) {
	var requestBody RequestBody
	if err := c.BindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	// 在這裡對接收到的消息進行修改（這裡只是一個示例）
	modifiedMessage := "Modified: " + requestBody.Message

	responseBody := ResponseBody{Message: modifiedMessage}
	c.JSON(http.StatusOK, responseBody)
}
