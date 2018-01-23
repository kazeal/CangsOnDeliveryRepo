<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Products extends CI_Controller {
    function __construct() 
		{
			parent::__construct();
			$this->load->model('ProductModel');
			$this->load->helper('form');
			$this->load->library('form_validation');			
		}
	public function get_products()
	{
		$data=$this->ProductModel->get_products();
        //header('Content-Type: application/json');
       // $data=json_encode($data);
         $rows=$data->num_rows();
         $data=$data->result_array();
        // print_r($data);
        // die();
        
        //print_r(json_encode($data));
        for($rows-1;$rows>0;$rows--)
        {
             $data[$rows-1]['productPic'] = base64_encode($data[$rows-1]['productPic']);
        }
       // print_r($data);die();
       $data2['data']=$data;
        print_r(json_encode($data2));
        /*
        foreach ($data as $val)
        {
             echo '<img src="data:image/jpeg;base64,'.base64_encode( $val['productPic'] ).'" width="100" height="100"/>';
            
        }
        */
	}
}
