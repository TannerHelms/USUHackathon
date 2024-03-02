using UnityEngine;

public class Player : MonoBehaviour
{
    float speed = 5.0f;

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
