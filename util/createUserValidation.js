export const createUserValidation  = {
    userName:{
      isLength:{
        Option:{
            min:1,
            max:32
        },
        errorMessage:"User have atleast min of 1 and max of 32 character",
      },
      notEmpty:{
        errorMessage:"UserName is required",
      },
      isString:{
        errorMessage:"UserName is required",
      }
    },
    displayName:{
        notEmpty:{
            errorMessage:"DisplayName is required",
        }
    },
    password:{
      notEmpty:{
        errorMessage:"DisplayName is required",
    }
    }
}