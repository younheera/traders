/**
 * @author heera youn
 * @create date 2023-10-18 08:16:29
 * @modify date 2023-10-18 21:13:36
 */
import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import {HiChevronUpDown, HiCheck} from 'react-icons/hi2';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

const customSelectbox = {
    verticalAlign: 'middle',
    textAlign: 'center',
  };
  
  export default function MobileListbox() {
  
    return (

    <FloatingLabel style={{color: 'green'}}>
      <Form.Select
      className='customSelectbox' style={{height: '62px', width:'150px', borderColor: 'green', borderWidth: '2px'}}>
        <option className='customSelectbox'>통신사 * <HiChevronUpDown/></option>
        <option value="SKT"><HiCheck/>SKT</option>
        <option value="KT"><HiCheck/>KT</option>
        <option value="LG U+"><HiCheck/>LG U+</option>
        <option value="SKT 알뜰폰"><HiCheck/>SKT 알뜰폰</option>
        <option value="KT 알뜰폰"><HiCheck/>KT 알뜰폰</option>
        <option value="LG U+ 알뜰폰"><HiCheck/>LG U+ 알뜰폰</option>
      </Form.Select>
    </FloatingLabel>
    )
  }
