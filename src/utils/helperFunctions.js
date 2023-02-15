/**
 * The below function convert the normal array of object to 
 * {label: "",value:1} pair which is suitable for React Select
 * component.
 */
export let ConvertToReactSelect = (data, valueKey, labelKey) => {
    if (!data || !data?.length) {
        return [];
    }

    return data.map((val) => {
        return {
            ...val,
            value: val[valueKey],
            label: val[labelKey],
        };
    });
};

/**
 * The below function convert the uploaded file to base64 file.
 */
export let ToBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

/**
 * The below function capitalize the given string.
 */
export let CapitalizeString = (string) => {
    if (!string) {
        return string;
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * The below function convert the HEX code to RGBA
 */
export let ConvertHexToRGBA = (hex, opacity) => {
    if (hex) {
        let tempHex = hex.replace("#", "");
        let r = parseInt(tempHex.substring(0, 2), 16);
        let g = parseInt(tempHex.substring(2, 4), 16);
        let b = parseInt(tempHex.substring(4, 6), 16);

        return `rgba(${r},${g},${b},${opacity / 100})`;
    }
    return null;
};

/**
 * The below function will scroll the page to the Top.
 */
export let ScrollToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// Check the versions
export let semverGreaterThan = (versionA, versionB) => {

    const versionsA = versionA ? versionA.split(/\./g) : ["0", "0", "0"];
    const versionsB = versionB ? versionB.split(/\./g) : ["0", "0", "0"];

    while (versionsA.length || versionsB.length) {
        const a = Number(versionsA.shift());

        const b = Number(versionsB.shift());
        // eslint-disable-next-line no-continue
        if (a === b) continue;
        // eslint-disable-next-line no-restricted-globals
        return a > b || isNaN(b);
    }
    return false;
};

// Refresh the cache by clearing the cache and reload
export const refreshCacheAndReload = () => {
    if (caches) {
        // Service worker cache should be cleared with caches.delete()
        caches.keys().then((names) => {
            for (const name of names) {
                caches.delete(name);
            }
        });
    }
    // delete browser cache and hard reload
    window.location.reload(true);
};

// To get distance between two lattitude and longitude
export const distance = (lat1, lon1, lat2, lon2, unit) => {
    if ((lat1 === lat2) && (lon1 === lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit === "K") { dist = dist * 1.609344 }
        if (unit === "N") { dist = dist * 0.8684 }
        return dist;
    }
}

function getDictionary() {
    return validateDictionary("ABCDEFGHIJKLMNOPQRSTUVWXYZ")

    function validateDictionary(dictionary) {
        for (let i = 0; i < dictionary.length; i++) {
            if(dictionary.indexOf(dictionary[i]) !== dictionary.lastIndexOf(dictionary[i])) {
                console.log('Error: The dictionary in use has at least one repeating symbol:', dictionary[i])
                return undefined
            }
        }
        return dictionary
    }
}

export const colorCodes ={
// change the grade color
    "A":{Color:"#1CBC28",BackgroundColor:"#1CBC28"},
    "B":{Color:"#7dfc7d",BackgroundColor:"#7dfc7d"},
    "C":{Color:"#DCBD1E",BackgroundColor:"#DCBD1E"},
    "D":{Color:"#DC831E",BackgroundColor:"#DC831E"},
    "E":{Color:"#fc3333",BackgroundColor:"#fc3333"}
}



const COUNT_FORMATS =
[
  { // 0 - 999
    letter: '',
    limit: 1e3
  },
  { // 1,000 - 999,999
    letter: 'K',
    limit: 1e6
  },
  { // 1,000,000 - 999,999,999
    letter: 'M',
    limit: 1e9
  },
  { // 1,000,000,000 - 999,999,999,999
    letter: 'B',
    limit: 1e12
  },
  { // 1,000,000,000,000 - 999,999,999,999,999
    letter: 'T',
    limit: 1e15
  }
];
    
// Format Method:
 export function numberToText(value)
{
  const format = COUNT_FORMATS.find(format => (value < format.limit));

  value = (1000 * value / format.limit);
  value = Math.round(value * 10) / 10; // keep one decimal number, only if needed

  return (value + format.letter);
}

// export function numberToText(num) {
//     num = num.toString().replace(/[^0-9.]/g, '');
//     if (num < 1000) {
//         return num;
//     }
//     let si = [
//       {v: 1E3, s: "K"},
//       {v: 1E6, s: "M"},
//       {v: 1E9, s: "B"},
//       {v: 1E12, s: "T"},
//       {v: 1E15, s: "P"},
//       {v: 1E18, s: "E"}
//       ];
//     let index;
//     for (index = si.length - 1; index > 0; index--) {
//         if (num >= si[index].v) {
//             break;
//         }
//     }
//     return (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[index].s;
// }

export function numberToEncodedLetter(number) {
    //Takes any number and converts it into a base (dictionary length) letter combo. 0 corresponds to an empty string.
    //It converts any numerical entry into a positive integer.
    if (isNaN(number)) {return undefined}
    number = Math.abs(Math.floor(number))

    const dictionary = getDictionary()
    let index = number % dictionary.length
    let quotient = number / dictionary.length
    let result
    
    if (number <= dictionary.length) {return numToLetter(number)}  //Number is within single digit bounds of our encoding letter alphabet

    if (quotient >= 1) {
        //This number was bigger than our dictionary, recursively perform this function until we're done
        if (index === 0) {quotient--}   //Accounts for the edge case of the last letter in the dictionary string
        result = numberToEncodedLetter(quotient)
    }

    if (index === 0) {index = dictionary.length}   //Accounts for the edge case of the final letter; avoids getting an empty string
    
    return result + numToLetter(index)

    function numToLetter(number) {
        //Takes a letter between 0 and max letter length and returns the corresponding letter
        if (number > dictionary.length || number < 0) {return undefined}
        if (number === 0) {
            return ''
        } else {
            return dictionary.slice(number - 1, number)
        }
    }
}