using UnityEngine;

public class NewBehaviourScript : MonoBehaviour
{
    Player player = null; // Reference to the Player component

    void Start()
    {
        player = GetComponent<Player>(); // Get the Player component attached to this GameObject
    }

    void Update()
    {
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