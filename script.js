function getDistance(x1, y1, x2, y2)
{
   xDis = Math.abs(x1 - x2);
   yDis = Math.abs(y1 - y2);
   xPy = xDis * xDis;
   yPy = yDis * yDis;
   totalDis = Math.sqrt(xPy + yPy);
   floatedDis = Math.round(100 * totalDis) / 100;
   return floatedDis;
}

function existsCloserVillage(origin, dest, cluster)
{
   startingDistance = getDistance(origin[0], origin[1], dest[0], dest[1]);

   for (nums in document.getElementsByTagName('div'))
   {
      cell = document.getElementsByTagName('div')[nums];
      if (cell.className == 'cox')
      {
         xCo = document.getElementsByTagName('div')[nums].innerHTML.substring(1);
         yCo = document.getElementsByTagName('div')[nums * 1 + 2].innerHTML.substring(0, document.getElementsByTagName('div')[nums * 1 + 2].innerHTML.length - 1);
         vilRoot = document.getElementsByTagName('div')[nums - 1];
         vil = vilRoot.innerHTML.substring(vilRoot.innerHTML.indexOf('>'), vilRoot.length)
         vil = vil.substring(1, vil.indexOf('<'))
         if (getDistance(xCo, yCo, dest[0], dest[1]) < (startingDistance - cluster))
         {
            info = Array(xCo, yCo, vil);
            return info;
         }
      }
   }

   return false;
}

troopTravel = 6;
goldRow = 1;
keepGoing = true;

while (keepGoing)
{
   goldRow++;
   if (document.getElementsByTagName('tr')[goldRow] == null || document.getElementsByTagName('tr')[goldRow].getChildren()[1].className != "vil")
   {
      keepGoing = false;
      continue;
   }
   cell = document.getElementsByTagName('tr')[goldRow].innerHTML;
   if (cell.indexOf('Unoccupied Oasis') > 1)
   {
      cell = cell.substr(cell.indexOf("(") + 1, cell.length)
      $calcCoords = cell.substr(0, cell.indexOf(")")).split("|");
      $startingCoords = document.title.toString().substring(document.title.toString().indexOf('(') + 1, document.title.toString().indexOf(')')).split('|');
      $calcDist = getDistance($startingCoords[0], $startingCoords[1], $calcCoords[0], $calcCoords[1]);
      $calcMins = ($calcDist / 7 * 60) / 60;
      closerVillage = existsCloserVillage($startingCoords, $calcCoords, 3)
      if (closerVillage == false)
      {
         document.getElementsByTagName('tr')[goldRow].getChildren()[1].getChildren()[0].innerHTML += '&nbsp;<font color="red">!!</font>&nbsp;';
      } else {
         document.getElementsByTagName('tr')[goldRow].getChildren()[1].getChildren()[0].innerHTML += '&nbsp;<font style="color: red; font-weight: normal; text-variant: small-caps; font-size-adjust: 0.4">' + closerVillage[2] + '</font>&nbsp;';
      }

   } else {
      continue;
   }
}


