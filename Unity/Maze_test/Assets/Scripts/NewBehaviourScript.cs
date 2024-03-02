using System;
using System.Collections.Generic;
using SocketIOClient;
using SocketIOClient.Newtonsoft.Json;
using UnityEngine;
using UnityEngine.UI;
using Newtonsoft.Json.Linq;
using System.Security.Cryptography;

public class NewBehaviourScript : MonoBehaviour
{
    Player player = null; // Reference to the Player component
    public SocketIOUnity socket;
    private bool moveUp = false;
     private bool moveLeft = false;
     private bool moveRight = false;
     private bool moveDown = false;
    void Start()
    {
        player = GetComponent<Player>(); // Get the Player component attached to this GameObject

        socket = new SocketIOUnity("http://129.123.181.235:8080");
        

        socket.OnConnected += (sender, e) =>
        {
            Debug.Log("socket.OnConnected");
        };

        socket.Connect();
        socket.On("Left", response => {
            if (response.GetValue<string>() == player.id)
            {
                moveLeft = true;
            }
        });

        
        socket.On("Right", response => {
            if (response.GetValue<string>() == player.id)
            {
                moveRight = true;
            }
        });

        socket.On("Up", response => {
            if (response.GetValue<string>() == player.id)
            {
                moveUp = true;
            }
        });
        
        socket.On("delete", response => {
            Debug.Log("Deleting Playere");
            if (response.GetValue<string>() == player.id)
            {
                Destroy(player);
            }
        });

        socket.On("Down", response => {
            if (response.GetValue<string>() == player.id)
            {
                moveDown = true;
            }
        });
    }

    private int speed = 15;

    void Update()
    {
        if (moveUp) {
            transform.Translate(0, speed * Time.deltaTime, 0, 0);
            moveUp = false;
        }

        if (moveLeft) {
            transform.Translate(-speed * Time.deltaTime, 0, 0);
            moveLeft = false;
        }

        if (moveRight) {
            transform.Translate(speed * Time.deltaTime, 0, 0);
            moveRight = false;
        }

        if (moveDown) {
            transform.Translate(0, -speed * Time.deltaTime, 0, 0);
            moveDown = false;
        }
        // Input handling for moving the player
        if (Input.GetKey(KeyCode.LeftArrow))
        {
            player.MoveLeft();
        }

        if (Input.GetKey(KeyCode.RightArrow))
        {
            player.MoveRight();
        }

        if (Input.GetKey(KeyCode.UpArrow))
        {
            player.MoveUp();
        }

        if (Input.GetKey(KeyCode.DownArrow))
        {
            player.MoveDown();
        }
    }

    private void OnCollisionEnter2D(Collision2D collision)
    {
        if (collision.gameObject.tag == "Walls")
        {
            Debug.Log("Wall hit");
        }
    }
}