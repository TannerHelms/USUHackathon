using System;
using System.Collections.Generic;
using SocketIOClient;
using SocketIOClient.Newtonsoft.Json;
using UnityEngine;
using UnityEngine.UI;
using Newtonsoft.Json.Linq;
using System.Net.Sockets;
using System.Security.Cryptography;

public class InstantiationExample : MonoBehaviour
{
    // Reference to the Prefab. Drag a Prefab into this field in the Inspector.
    public GameObject myPrefab;
    public SocketIOUnity socket;
    public bool newPlayer = false;
    public string playerId = string.Empty;
    public List<GameObject> players = new List<GameObject>();
    



// This script will simply instantiate the Prefab when the game starts.
void Start()
    {

        socket = new SocketIOUnity("http://129.123.181.235:8080");

        socket.OnConnected += (sender, e) =>
        {
            Debug.Log("socket.OnConnected");
            
        };

        socket.On("newPlayer", response =>
        {
            Debug.Log("creating new player");
            playerId = response.GetValue<string>();
            newPlayer = true;
        });

        socket.Connect();
    }
    void Update()
    {
        if (newPlayer)
        {
            GameObject InstantiatedObject = Instantiate(myPrefab, new Vector3(0, 0, 0), Quaternion.identity);
            var MyScript = InstantiatedObject.GetComponent<Player>();
            MyScript.id = playerId;
            players.Add(InstantiatedObject);
            newPlayer = false;
        }
        if (Input.GetKey(KeyCode.Space))
        {
            Instantiate(myPrefab, new Vector3(0, 0, 0), Quaternion.identity);
        }
    }
}