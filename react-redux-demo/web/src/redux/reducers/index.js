import { combineReducers } from 'redux'

import Myitem from '../containers/App/components/Myitem/reducer' //导航条

import EbsOwner from './EbsOwner' //公共属性和状态

import {InventoryTable, Log, BatchUpdate, OptionDialog} from './Trade'


export  {Myitem, InventoryTable, Log, BatchUpdate, OptionDialog, EbsOwner}
