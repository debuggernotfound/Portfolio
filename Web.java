import java.io.*;
import java.net.*;
import java.util.Random;

public class Web {
    public static void main(String[] args) {
        try
        {
            ServerSocket serverSocket = new ServerSocket(5678); //new connection with my ip and my port on my computer
            System.out.println("Server is listening on the port 5678");
            while (true) //infinite loop (but if the machine doesn't send a signal consistently, will this loop still do anything? I'm guessing no)
            {
                Socket socket = serverSocket.accept(); //establish a TCP connection from some other machine
                System.out.println("New client connected"); // show that machine is connected

                new ClientHandler(socket).run(); //process the actions from the message that the machine sends
            }
        }
        catch (IOException ex)
        {
            System.out.println("Server exception" + ex.getMessage());
            ex.printStackTrace(); //for debugging
        }
    }
}

class ClientHandler {
    private Socket socket; 

    public ClientHandler (Socket socket)
    {
        this.socket = socket;
    }

    public void run() 
    {
        try
        {
            OutputStream outputStream = socket.getOutputStream(); 
            PrintWriter writer = new PrintWriter(outputStream, true); //where does this write to? I'm thinking the terminal of this machine (sends to client machine)
            int random = new Random().nextInt(10000); //randomly generate number for a 50 50 with what action my machine performs
            if (random % 2 == 0)
            {
                System.out.println("Sleep 5 seconds");
                Thread.sleep(5 * 1000);    
                System.out.println("Done sleeping");
            }

            String response = "HTTP/1.1 200 OK\r\n\r\nHello, World"; //prints out hello world in response to the message from other computer
            writer.println(response);
            writer.flush();
            socket.close(); //closes the connection?
        }
        catch (IOException ex)
        {
            System.out.println("Server exception" + ex.getMessage()); //catch exceptions
            ex.printStackTrace();
        }
        catch (InterruptedException ex)
        {
            // Swallow it
        }
    }
}
