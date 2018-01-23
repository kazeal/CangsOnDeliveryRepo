<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class ProductModel extends CI_Model
{
    function __construct() 
    {
       
        $this->load->database();
       
		
    }
    function get_products()
    {
        $results=$this->db->get('products');
       
        return $results;
    }
    function auth_user($uname,$pass)
    {
        
        $con=$this->db->conn_id;
        $username = mysqli_real_escape_string($con,$uname);
        $password = mysqli_real_escape_string($con,$pass);
        $results=$this->db->get_where('users', array('username' => $uname));
        $numrows=$results->num_rows();
        if($numrows)
        {
            $rows = $results->row_array();
            $hash = $rows['password'];
            if(password_verify($pass, $hash))
            {
                session_start();
                $_SESSION['username']=$rows['username'];
                $_SESSION['id']=$rows['id'];
                echo 1;
            }
            else
            {
                exit;
            }

        }
    }

    function reg_user($uname,$pass,$pass2)
    {
            $con=$this->db->conn_id;
            $uname = mysqli_real_escape_string($con,$uname);
            $pass = mysqli_real_escape_string($con,$pass);
            $pass2 = mysqli_real_escape_string($con,$pass2);
           
            $results=$this->db->get_where('users', array('username' => $uname));
            $numrows=$results->num_rows();
            if($numrows)
            {
                echo "taken";
                exit;
            }
            if($pass === $pass2)
            {
                $hash = password_hash($pass, PASSWORD_BCRYPT);
                $account=array(
                    'username'=>$uname,
                    'password'=>$hash
                );
                $this->db->insert('users', $account);
                $id=$this->db->insert_id();
                $results=$this->db->get_where('users', array('id' => $id));
                $row=$results->row_array();
                $id = $row['id'];
                $name = $row['username'];
                session_start();
                $_SESSION['username']=$name;
                $_SESSION['id']=$id;
                echo 'success';
                exit;
            }
            else
            {
                echo "password"; 
                exit;
            }
    }
}