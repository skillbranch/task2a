import mongoose from 'mongoose';
//mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost/pokemons');
import express from 'express';
import cors from 'cors';
import url from 'url';
import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import Pokemons from './models/pokemons';
import PokemonsLoads from './models/load';
const app = express();
const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';
const zooUrl = 'https://gist.githubusercontent.com/isuvorov/55f38b82ce263836dadc0503845db4da/raw/pets.json';

let pc = {};
fetch(pcUrl)
  .then(async (res) => {
    pc = await res.json();
  })
  .catch((err) => {
    console.log('Чтото пошло не так:', err);
  });

let zoo ={};
fetch(zooUrl)
  .then(async (res) => {
    zoo = await res.json();
  })
  .catch((err) => {
    console.log('Чтото пошло не так:', err);
  });


app.use(cors());
app.get('/', (req, res) => {
  res.json({
    hello: 'JS World',
  });
});

app.get('/task2A', (req, res) => {
  const sum = (parseFloat(req.query.a) || 0) + (parseFloat(req.query.b) || 0);
  res.send(sum.toString());
});

function slashw(s) {
  return s.match(/^['A-Za-z\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]+$/) !== null;
}

app.get('/task2B', (req, res) => {
  const f = (req.query.fullname || '').trim();
  const fio = f.split(/\s+/);
  console.log(fio);
  let result;


  if (fio.length > 0 && fio.length < 4 && fio[0].length > 0 && fio.reduce((o, n) => o && slashw(n), true)) {
    const [family, ...ns] = fio.reverse();
    result = ns.map(n => `${n[0].toUpperCase()}.`).reverse().join(' ');
    result = `${family[0].toUpperCase()}${family.slice(1).toLowerCase()}${(result.length > 0) ? ' ' : ''}${result}`;
  } else {
    result = 'Invalid fullname';
  }
  res.send(result);
});

app.get('/task2C', (req, res) => {
  console.log('===================');
  console.log(req.query.username);
  let un = String.trim(req.query.username);
  let username;
  if (!/\//.test(un)) {
    if (un.length > 0) {
      if (un[0] != '@') {
        un = `@${un}`;
      }
      return res.send(un);
    }
  }
  if (!/^(http:|https:)\/\//.test(un)) {
    if (/^\/\//.test(un)) {
      un = `http:${un}`;
    } else {
      un = `http://${un}`;
    }
  }

  console.log('UN', un);
  const pathname = url.parse(un).pathname;
  console.log(pathname);
  username = /^\/([^\/]+)/.exec(pathname);
  if (username.length > 0) {
    if (username[1][0] != '@') {
      username = `@${username[1]}`;
    } else {
      username = username[1];
    }
  }
  res.send(username);
});

function f(objs = [], [cur, ...path] = []) {
  if (objs.length == 0) {
    return [];
  }
  if (cur === undefined) {
    return objs;
  }

  if (!/^\d+$/.test(cur)) {
    return f(objs.reduce((res, obj) => {
      if (typeof obj == 'object' && obj.hasOwnProperty(cur)) {
	    const objcur = obj[cur];

	    if (!Array.isArray(objcur)) {
      return [...res, obj[cur]];
	    }
	    return res.concat(objcur);
      } else {
        return res;
      } }, []),
     path);
  } else {
    const icur = parseInt(cur, 10);
    const obj = objs[icur];

    return f((obj !== undefined) ? [objs[icur]] : [], path);
  }
}
app.get('/task3A/volumes', (req, res) => {
  res.json(_.mapValues(f([pc], ['hdd']).reduce((sum, d) => {
    sum[d.volume] = (sum[d.volume] || 0) + d.size;
    return sum;
  }, {}), num => `${num}B`));
});
app.get(/^\/task3A(|\/.*)$/, (req, res) => {
  const url = req.params[0];
  console.log(url);
  const path = (url.length > 1) ? url.split('/').splice(1) : [];
  if (path[path.length - 1] == '') {
    path.pop();
  }
  const rslt = f([pc], path);

  switch (rslt.length) {
    case 1: res.json(rslt[0]); break;
    case 0: res.status(404).send('Not Found'); break;
    default: res.send(rslt);
  }
});
function hsl2rgb(h,s,l){
  let q=(l<0.5)?l*(1.0+s):(l+s-(l*s));
  let p=2.0*l-q;
  let hk =h/360;
  let tr =hk+1/3;
  let tg=hk;
  let tb=hk-1/3;

  return [tr,tg,tb].map((x)=>{
    if (x<0){
      return x+1;
    }
    if(x>1){
      return x-1;
    }
    return x;
  }).map((t)=>{
	if(t<1/6) {
	return p+((q-p)*6*t);
	}
	if(t<1/2){
	return q;
	}
	if(t<2/3){
	return p+((q-p)*(2/3-t)*6);
	}
	return p;
	})
}
app.get('/task2D', (req,res) => {
   var r='Invalid color';
   var m=(/^\s*#?([0-9a-f]{6})\s*$/i.exec(req.query.color));
   if(m!==null){
       return res.send('#'+m[1].toLowerCase());
   }else {
      
      m=/^\s*#?([0-9a-f]{3})\s*$/i.exec(req.query.color);
      if(m!==null){
      return res.send(m[1].toLowerCase().split('').reduce((o,n)=>{return `${o}${n}${n}`},"#"));
     }
  }
  var c = (''+unescape(req.query.color)).replace(/\s+/g,'');
  console.log(c)
  m=/^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/.exec(c);
  if(m!==null){
     let re="#";
     for( let h of [ parseInt(m[1],10).toString(16),
       parseInt(m[2],10).toString(16),
       parseInt(m[3],10).toString(16)]){
       if(h.length==1){
         re=re+'0'+h;
    
       } else if (h.length == 2 ){
         re=re+h;
       } else{
          return res.send(r);
       }
     }
     return res.send(re);
     
  }
  m=/^hsl\((\d{1,3}),(\d{1,3})%,(\d{1,3})%\)/.exec(c);
  if(m!==null){
	let re = "#";
        let [h,s,l]=[m[1],m[2],m[3]].map(x=>parseInt(x,10));
        if(h>360 || s> 100 || l> 100){
 		return res.send(r);
        }
        re=re+hsl2rgb(h,s/100,l/100).map(x=>Math.round(x*255).toString(16)).map(x=>(x.length==1)?'0'+x:x).join('');
	return res.send(re);
        
  }
  res.send(r);
});
var cnt=1;
app.get('/task2X', (req, res) => {
var t=Math.ceil(Math.random()*19);

let a=['1','18','243','3240','43254','577368','7706988','102876480','1373243544','18330699168','244686773808','3266193870720','43598688377184','581975750199168','7768485393179328','103697388221736960',
'1384201395738071424','18476969736848122368','246639261965462754048'];
return res.send(a[req.query.i]);
})
function f1(objs = [], [cur, ...path] = []) {
  if (objs.length == 0) {
    return [];
  }
  if (cur === undefined) {
    return objs;
  }

  if (!/^\d+$/.test(cur)) {
    return f1(objs.reduce((res, obj) => {
      if (typeof obj == 'object' && obj.hasOwnProperty(cur)) {
	    const objcur = obj[cur];

	    if (!Array.isArray(objcur)) {
      return [...res, obj[cur]];
	    }
	    return res.concat(objcur);
      } else {
        return res;
      } }, []),
     path);
  } else {
    const icur = parseInt(cur, 10);
    //search by id
    let obj;
    for (obj of objs){
      if(obj.hasOwnProperty('id') 
         && obj.id==icur ){
                 return f1([obj],path);
         break;
      }
    }
    return f1([],path);
  }
}
function _task3BFilter(arr,query,kquery){
return arr.filter(function(obj){
        if(kquery.length >0){  
  		for(let key of kquery){
                       
                    
                    let matches = key.match(/(.*)(_gt|_lt)$/);
                    if(matches === null) {
                       if ( !obj.hasOwnProperty(key) || obj[key]!=query[key]) {return false;}
                    }else{
                      if(!obj.hasOwnProperty(matches[1])){return false;}
                      switch(matches[2]){
                        case '_lt': 
				if(obj[matches[1]]>=query[key]){return false;}
				break;
                         case '_gt': 
				if(obj[matches[1]]<=query[key]){return false;}
				break;
                      }
                    }
        	}
        }
        return true;
  });

}
function usersHavePet(petType){
  let ids=_task3BFilter(f1([zoo],['pets']),{type:petType},['type']).map(o=>o.userId);
  console.log('IDS',ids);
  return f1([zoo],['users']).filter(obj=>ids.indexOf(obj.id)>=0)
}
app.get(/^\/task3B(|\/.*)$/, (req, res) => {
  const url = req.params[0];
  console.log(url);
  const path = (url.length > 1) ? url.split('/').splice(1) : [];
  if (path[path.length - 1] == '') {
    path.pop();
  }
  let data; 
  let havePet=false;
  let populate= path[path.length-1]=='populate';
  if(populate){
     path.pop();
  }
  const query = req.query;
  if( path.length==1 
      && path[0]=='users'
      && query.hasOwnProperty('havePet')){
    data = usersHavePet(query.havePet)
    delete query.havePet;
    havePet=true;
  }else if (path.length==2 
        && path[0]=='users'
        && !/^\d+$/.test(path[1])){
    console.log("NOT DIGIT USER");
    data=[];
    for( let user of f1([zoo],['users'])){
       if(user.username == path[1]){
         console.log('User', user);
         data=[user];
         break;
       }
    }
  }else{
    console.log('DEfault data');
    data=f1([zoo],path)
  }
  console.log("data",data);
  const kquery = Object.keys(query);

  let rslt  = _task3BFilter(data,query,kquery);  
  console.log(req.query)
console.log(rslt)
  if(path[0]=='pets' && populate){
     let users = f1([zoo],['users']);
     rslt=rslt.map((r)=>{
         let o=Object.assign({},r)
         for(let user of users){
            if(o.userId==user.id){
            return Object.assign(o,{user:user}) 
            
            
            }
         }
     })
  }else if(path[0]=='users' && populate){
     let pets = f1([zoo], ['pets']);
     rslt=rslt.map ( (o) => {
        
        let pts=[];
        let pet;
        for( pet of pets){
           if (pet.userId==o.id){
              pts.push(pet);
           } 
        }

        return Object.assign({},o, {pets:pts});
     });
  }
  switch (rslt.length) {
    case 1: if(!havePet &&  kquery.length == 0){ 
              res.json(rslt[0]);
            }else{
              res.json(rslt);
            } 
            break;
    case 0: 
            if(!havePet && kquery.length == 0 ){
            	res.status(404).send('Not Found'); 
            }else{
            	res.json([]); 
            }
	 break;

    default: res.send(rslt);
  }
});
let pokemonsUrl='https://pokeapi.co/api/v2/pokemon';
let Pokemon=Pokemons();
let PokemonLoad=PokemonsLoads()
async function addPokemons(arr){
   let promises=[];
    for(let poke of arr){
       let p = new Pokemon(poke);

       promises.push(p.save());
       //pokemons.push.apply(pokemons,arr)
    }
    return await promises;
}
async function loadPokemons(Url){
   
  try{
     const response = await fetch(Url);
     const pok= await response.json();
     
     
     await addPokemons(pok.results);
     
     if(pok.next!=null){
       PokemonLoad.then((load)=>{
         load.page=Url;
         load.save();
       })
       
       return await loadPokemons(pok.next);
     }
     PokemonLoad.then((load)=>{
         load.finished=true;
         load.save();
       })
       
     return Promise.resolve();
  }catch(e){
    console.log('ERROR',e);
    throw e;
  }
}


function populatePokemons(){
      let r= Pokemon.find({$or : [{height:{$exists:false}}, {weight:{$exists:false}}]}).limit(20).exec().then(async function(pokes){
      try{
            if(pokes.length == 0) {
               return Promise.reject();
            }
            let promises=[];
            for(let poke of pokes){
                const response = await fetch(poke.url);
                const rpok = await response.json();
                
                poke.height=rpok.height|0;
                poke.weight=rpok.weight|0;
                console.log(poke.name, poke.height,poke.weight, poke.url)
                promises.push(poke.save())
            }
            
            return Promise.all(promises);
       }catch(e){
              console.log(e);
       }
     })
     r.then(()=>populatePokemons()).catch(()=>console.log('Pokemons populated'));
     
}
PokemonLoad.then((load)=>{    
    ((!load.finished)?loadPokemons(load.page||pokemonsUrl):Promise.resolve()).then(function(){
     console.log('Pokemons loaded');
     
    populatePokemons();
  });
});
function middleware3C (req,res,next){
req.sort={name:1};
req.limit=(req.query.limit|0)||20;
req.offset=(req.query.offset|0)||0;
next();
}
app.get('^/task3C/fat', middleware3C, (req,res)=>{
Pokemon.aggregate().project({name:1,weight:1, height:1,field:{$divide:["$height","$weight"]}}).sort(Object.assign({field:1},req.sort)).skip(req.offset).limit(req.limit).exec().then((poks)=>res.json(poks.map(o=>o.name)));
})
app.get('^/task3C/angular', middleware3C, (req,res)=>{
Pokemon.aggregate().project({name:1,weight:1, height:1,field:{$divide:["$weight","$height"]}}).sort(Object.assign({field:1},req.sort)).skip(req.offset).limit(req.limit).exec().then((poks)=>res.json(poks.map(o=>o.name)));
})
app.get('^/task3C/heavy', middleware3C, (req,res)=>{
Pokemon.find({}).sort(Object.assign({weight:-1},req.sort)).select('name').skip(req.offset).limit(req.limit).exec().then((poks)=>res.json(poks.map(o=>o.name)));
})
app.get('^/task3C/light', middleware3C, (req,res)=>{
Pokemon.find({}).sort(Object.assign({weight:1},req.sort)).select('name').skip(req.offset).limit(req.limit).exec().then((poks)=>res.json(poks.map(o=>o.name)));
})
app.get('^/task3C/micro', middleware3C, (req,res)=>{
Pokemon.find({}).sort(Object.assign({height:1},req.sort)).select('name').skip(req.offset).limit(req.limit).exec().then((poks)=>res.json(poks.map(o=>o.name)));
})
app.get('^/task3C/huge', middleware3C, (req,res)=>{

Pokemon.find({}).sort(Object.assign({height:-1},req.sort)).select('name').skip(req.offset).limit(req.limit).exec().then((poks)=>res.json(poks.map(o=>o.name)));
})
app.get('^/task3C', middleware3C, (req,res)=>{

Pokemon.find({}).sort(req.sort).select('name').skip(req.offset).limit(req.limit).exec().then((poks)=>res.json(poks.map(o=>o.name)));

})
app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
