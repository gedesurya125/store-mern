//converting file to base64 Format typeof String
export const toBase64 = async(file, cb) => {
  const reader = new FileReader();
  await reader.readAsDataURL(file);
  reader.onload = () => cb(null, reader.result);
  reader.onerror = (err) => cb(err, null);
}


/**
 * Convert File to Base64 fomat
 * consume event from file input as event, then return converted file to base64 on cb(object)
 * returning Detailed File as Object to second parameter of callback
 * @function getFileWithBase64 
 * @param {object} event - Efent from the function
 * @param {getFileWithBase64cb} cb
 */
export const getFileWithBase64 = (event, cb) => {
  const file = event.target.files[0];
  const { lastModified, name, size, type } = file;
  toBase64(file, (err, res) => {
    err ? cb(err, null) : cb(null, {
      lastModified,
      name,
      size,
      type,
      base64: res
    })
  })
}
  /** 
 * Second Parameter of get FileWithBase64 Method
 * @callback getFileWithBase64cb
 * @param {object} err
 * @param {{lastModified: string, name: string, size: number, type: string, base64: object}} res 
 */




  

/**
 * Conver ISO Date Format To plain text date
 * @param {string} isoDate 
 * @returns 
 */
export const isoDateToPlain = (isoDate) => {
  const date = new Date(isoDate);
  const dmy = {
    year: date.getFullYear(),
    month: () => {
      switch(date.getMonth()){
        case 0: return("Januari");
        case 1: return("Februari");
        case 2: return("Maret");
        case 3: return("April");
        case 4: return("Mei");
        case 5: return("Juni");
        case 6: return("Juli");
        case 7: return("Agustus");
        case 8: return("September");
        case 9: return("Oktober");
        case 10: return("November");
        case 11: return("Desember");
        default: return("Month not detected");

      }
    },
    dt: () => {
      const dateNumber = date.getDate();
      
      const compiledDt = dateNumber.toString().padStart(2, '0');
      return compiledDt;	
    }
  }

  const compileDate = dmy.dt()+' '+dmy.month()+' '+dmy.year;

  return compileDate;
  

}

/**
 * Merge class hook from make styles material ui
 * @param {string[]} classArr 
 */
export const classX = (classArr) => {
let classStr = '';
classArr.forEach(cls => {
  classStr = classStr + ' ' + cls;
});
return classStr;

}