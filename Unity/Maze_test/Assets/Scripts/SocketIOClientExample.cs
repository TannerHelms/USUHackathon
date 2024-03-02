using System;
using System.Collections.Generic;
using SocketIOClient;
using SocketIOClient.Newtonsoft.Json;
using UnityEngine;
using UnityEngine.UI;
using Newtonsoft.Json.Linq;

public class SocketIOClientExample : MonoBehaviour
{
    private SocketIOUnity socket;
    private void Start()
    {
        socket = new SocketIOUnity("http://localhost:3000");
        socket.OnConnected += (sender, e) =>
        {
            Debug.Log("Connected Bitch");

        };

        socket.Connect();

    }

    private void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space)) {
            Debug.Log("Space key pressed");
            socket.Emit("message", "Space Pressed");
        }
    }

}