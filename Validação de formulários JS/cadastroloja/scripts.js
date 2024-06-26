const pwd = document.getElementById("pwd");
const pwd2 = document.getElementById("pwd2");
const nasc = document.getElementById("nasc");
const idadeHTML = document.getElementById("idade");

const cpf = document.getElementById("cpf");

function validate(item) {
    item.setCustomValidity(""); //limpa erros anteriores de validação
    item.checkValidity();
    if (item == pwd2) {
        if (item.value == pwd.value) {
            item.setCustomValidity("");
        } else {
            item.setCustomValidity("Essa joça não bate com a de cima");
        }
    }
    if (item == cpf) {
        let numCPF = cpf.value.replace(/[^0-9]/g, ""); //remove caracteres não-numéricos
        if (validateCPF(numCPF)) {
            item.setCustomValidity(""); //aprovado
        } else {
            item.setCustomValidity("CPF inválido");
        }
    }
    if (item == nasc) {
        let hoje = new Date(); //obtém data atual 
        let dnasc = new Date(nasc.value);
        let idade = hoje.getFullYear() - dnasc.getFullYear();
        let m = hoje.getMonth() - dnasc.getMonth();
        if (m < 0 || (m === 0 && hoje.getDate() < dnasc.getDate())) {
            idade--
        }
        if (idade >= 0) {
            idadeHTML.value = idade + " anos";
        } else {
            idadeHTML.value = "Ainda não nascido";
        }
        if (idade < 18) {
            item.setCustomValidity("Você precisa ser maior de 18 anos para cadastrar-se nessa joça");
        } else if (idade > 130) {
            item.setCustomValidity("Você não deve mentir sua idade tão descaradamente ao se cadastrar nessa joça");
        } else {
            item.setCustomValidity("");
        }
    }
}

function validateCPF(cpf) {
    var number, digits, sum, i, result, equal_digits;
    equal_digits = 1;
    if (cpf.length < 11)
        return false;
    for (i = 0; i < cpf.length - 1; i++)
        if (cpf.charAt(i) != cpf.charAt(i + 1)) {
            equal_digits = 0;
            break;
        }
    if (!equal_digits) {
        number = cpf.substring(0, 9);
        digits = cpf.substring(9);
        sum = 0;
        for (i = 10; i > 1; i--)
            sum += number.charAt(10 - i) * i;
        result = sum % 11 < 2 ? 0 : 11 - sum % 11;
        if (result != digits.charAt(0))
            return false;
        number = cpf.substring(0, 10);
        sum = 0;
        for (i = 11; i > 1; i--)
            sum += number.charAt(11 - i) * i;
        result = sum % 11 < 2 ? 0 : 11 - sum % 11;
        if (result != digits.charAt(1))
            return false;
        return true;
    }
    else
        return false;
}

function maskCPF() {
    let strCPF = cpf.value;
    if (strCPF.length == 3 || strCPF.length == 7) {
        cpf.value += ".";
    } else if (strCPF.length == 11) {
        cpf.value += "-";
    }

    validate(cpf);
}


cpf.addEventListener("input", function () { maskCPF() }); //novo

pwd.addEventListener("input", function () { validate(pwd) });
pwd2.addEventListener("input", function () { validate(pwd2) });
nasc.addEventListener("input", function () { validate(nasc) });

pwd.addEventListener("invalid", function msgPwd() {
    pwd.setCustomValidity("");
    pwd.checkValidity();
    if (pwd.value === "") {
        pwd.setCustomValidity("Essa joça não pode ficar em branco");
    } else {
        pwd.setCustomValidity("Essa joça deve conter pelo menos 8 caracteres: uma letra minúscula, uma letra maiúscula e um número maiúsculo");
    }
})