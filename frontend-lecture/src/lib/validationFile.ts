const maxFileSize = 5 * 1024 * 1024;

export const checkValidationFile = (file: File| undefined): boolean => {
      if (typeof file === "undefined") {
        alert("파일이 존재하지 않습니다.");
        return false;
      }
  
      if (file.size > maxFileSize) {
        alert("파일 용량의 최대 크기는 5MB로 제한합니다.");
        return false;
      }

      return true;
}