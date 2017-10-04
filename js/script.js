$(document).ready(() => {
	const employeesContainer = document.getElementById("employees-wrapper");
	const modalContent = document.getElementById('modal-content');
	const modalWindow = document.getElementById('modal-window');
	const searchFilter = document.getElementById('name-filter');
	var employeeTotal = 12;
  let employeeInfo= [];

//START***************************************
	$('.close-button').click(function () {
		modalContent.innerHTML ="";
		$("#modal-bg").css({"display": "none"});
	}); //end close button

	function getEmployeeDetail(results) {
		for (let i = 0; i< employeeTotal ; i++) {
			let newMember = results[i];
			let picture = newMember.picture.large;
			profilPic = '<img class="employee-picture" src="' + picture + '" alt="member profile picture">';
			let fullName = newMember.name.first + " " + newMember.name.last;
			let userName = newMember.login.username;
			let email = newMember.email;
			let cellNum = newMember.cell;

			let street = newMember.location.street;
			let city = newMember.location.city;
			let state = newMember.location.state;
			let postcode = newMember.location.postcode;
			let nat = newMember.nat;
			let dob = newMember.dob;

			employeeInfo.push({
				"index" : i,
				"pic": profilPic,
				"name": fullName,
				"username": userName,
				"email" : email,
				"cell" : cellNum,
				"street" : street,
				"city" : city,
				"state" : state,
				"postcode" : postcode,
				"country" : nat,
				"dob" : dob
			});
		}
	} //end getEmployeeDetail

	function displayEmployeeBox(employee) {
			let memberDiv = '<div class="employeeBox">';
			memberDiv += employee.pic;
			memberDiv += '<div class="quickDetail-wrapper">';
			memberDiv += '<h3 class="employee-name">' + employee.name + '</h3>';
			memberDiv += '<p class="employee-email">'+ employee.email + '</p>';
			memberDiv += '<p class="employee-city">'+ employee.city + '</p>';
			memberDiv += '</div>';
			memberDiv += '<div class="box-overlay"></div>';
			memberDiv += '</div>';
				$("#employees-wrapper").append(memberDiv);
	}//end displayEmployeeBox

	function setModalContent(employee) {
	 	$("#modal-bg").css({"display": "block"});

		let modalHTML;
		modalHTML = employee.pic;
		modalHTML += '<h3 class="modal-name">' + employee.name + '</h3>';
		modalHTML += '<span class="modal-username">(' + employee.username + ')</span>';
		modalHTML += '<p class="modal-email">'+ employee.email + '</p>';
		modalHTML += '<p class="modal-city">'+ employee.city + '</p>';
		modalHTML += '<div class="hr extra-info">';
		modalHTML += '<p class="modal-cell">'+ employee.cell + '</p>';
		modalHTML += '<p class="modal-address">'+ employee.street + ", " +  employee.country + " "+ employee.postcode +'</p>';
		modalHTML += '<p class="modal-dob">Birthday: '+ employee.dob + '</p>';
		modalHTML += '</div>';
		$("#modal-content").append(modalHTML);
	} //end setModalContent

	function findEmployeeIndex(name) {
		for (let i = 0; i < employeeTotal; i++) {
      if (employeeInfo[i].name.indexOf(name) != -1) { //if search IS a substring of any of employee's names
				var employeeID = employeeInfo[i].index ;
      }
    }
		return employeeID;
	}

	function nextItem() {
		let id = findEmployeeIndex($(".modal-name").text());
		id += 1;
		if (id > 11) {
		 	id = 0;
		}
		 modalContent.innerHTML ="";
		 setModalContent(employeeInfo[id]);
	}

	function prevItem() {
		let id = findEmployeeIndex($(".modal-name").text());
		id -= 1;
		if (id < 0) {
			id = 11;
		}
		modalContent.innerHTML ="";
		setModalContent(employeeInfo[id]);
	}

	searchFilter.addEventListener('keyup', () => {
		var searchContent = $("#name-filter").val().toLowerCase();
		var employeeBox = document.getElementsByClassName("employeeBox"); //returns an array of employeebox
		for (let i = 0; i < employeeTotal; i++) {
			var employeeNames = employeeInfo[i].name;
      if (employeeNames.indexOf(searchContent) === -1) { //if search is NOT a substring of any of employee's names
				$(employeeBox[i]).hide('slow');
      } else {
				$(employeeBox[i]).show('slow');

      }
    }
	});//end search-filter

	modalWindow.addEventListener('click', (e) => {
	  if (e.target.id == "next-item"){
			nextItem();
		} else if (e.target.id == "prev-item"){
 			prevItem();
 		}
	}); //end modalWindow click event

	employeesContainer.addEventListener('click', (e) => {
			if(e.target.className == 'box-overlay') {
				let selectedBox = e.target.parentNode;
				let selectedID = $(selectedBox).index();
				setModalContent(employeeInfo[selectedID]);
			}
	});//end employee-wrapper CLICK event

	$.ajax({
	  url: 'https://randomuser.me/api/?format=json&results=' + employeeTotal + '&inc=picture,name,login,email,location,cell,dob,nat&nat=us,gb',
	  dataType: 'json',
	  success: function(data) {
			getEmployeeDetail(data.results);
			for (let i = 0; i< employeeTotal ; i++) {
				displayEmployeeBox(employeeInfo[i]);
			}
	  }
	});//end ajax



});//end document ready
