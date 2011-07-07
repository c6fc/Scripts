// ==UserScript==
// @name           Gold Club Oasis Marker
// @namespace      GC
// @include        http://*.travian.us/build.php?gid=16&tt=100*
// ==/UserScript==


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

function getTSEffectMultiplier(origin)
{
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

         if (xCo == origin[0] && yCo == origin[1])
         {
            tsEffectMultiplier = (vil.indexOf('+') > 0) ? 1 + (vil.substring(vil.indexOf('+') + 1) * 0.1) : 1;

            return tsEffectMultiplier
         }
      }
   }

   return false;
}

function getDistanceTSEffect(distance, tsEffect)
{
   if (distance <= 30)
   {
      return distance;
   }

   tsEffectedDistance = distance - 30;
   tsEffectedDistance *= (1 / tsEffect);
   tsEffectedDistance += 30;

   return tsEffectedDistance;   
}

function existsCloserVillage(origin, dest, cluster)
{
   originTSEffect = getTSEffectMultiplier(origin);
   startingDistance = getDistanceTSEffect(getDistance(origin[0], origin[1], dest[0], dest[1]), originTSEffect);

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

         tsEffect = getTSEffectMultiplier(Array(xCo, yCo));
         distanceToTarget = getDistanceTSEffect(getDistance(xCo, yCo, dest[0], dest[1]), tsEffect);

         if (distanceToTarget < (startingDistance - cluster))
         {
            info = Array(xCo, yCo, vil);
            return info;
         }
      }
   }

   return false;
}

function runTasks()
{

   for (goldRow in document.getElementsByTagName('tr'))
   {
      if (goldRow * 1 != goldRow)
      {
         continue;
      }

      goldRow *= 1;
      if (document.getElementsByTagName('tr')[goldRow].childNodes.length > 3)
      {
         if (document.getElementsByTagName('tr')[goldRow].childNodes[2].className != "vil")
         {
            continue;
         }
      }

      cell = document.getElementsByTagName('tr')[goldRow].innerHTML;
      if (cell.indexOf('Unoccupied Oasis') > 1)
      {
         cell = cell.substr(cell.indexOf("(") + 1, cell.length)
         $calcCoords = cell.substr(0, cell.indexOf(")")).split("|");
         $startingCoords = document.title.toString().substring(document.title.toString().indexOf('(') + 1, document.title.toString().indexOf(')')).split('|');
         closerVillage = existsCloserVillage($startingCoords, $calcCoords, 3)
         if (closerVillage == false)
         {
            document.getElementsByTagName('tr')[goldRow].childNodes[2].childNodes[1].innerHTML += '&nbsp;<font color="red">!!</font>&nbsp;';
         } else {
            document.getElementsByTagName('tr')[goldRow].childNodes[2].childNodes[1].innerHTML += '&nbsp;<font style="color: red; font-weight: normal; text-variant: small-caps; font-size-adjust: 0.4">' + closerVillage[2] + '</font>&nbsp;';
         }

      } else {
         continue;
      }
   }
}


runTasks();

