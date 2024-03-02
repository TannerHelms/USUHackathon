using UnityEngine;
using SocketIOClient;
using SocketIOClient.Newtonsoft.Json;
using System;

public class Player : MonoBehaviour
{
    float speed = 10.0f;
    public string id = string.Empty;

    public void MoveUp()
    {
        transform.Translate(Vector3.up * speed * Time.deltaTime);
    }


    public void MoveDown()
    {
        transform.Translate(Vector3.down * speed * Time.deltaTime);
    }


    public void MoveLeft()
    {
        transform.Translate(Vector3.left * speed * Time.deltaTime);
    }


    public void MoveRight()
    {
        transform.Translate(Vector3.right * speed * Time.deltaTime);
    }
}
